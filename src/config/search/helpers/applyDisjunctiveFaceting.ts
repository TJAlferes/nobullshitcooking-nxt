import type { RequestState } from '@elastic/search-ui';
import axios from 'axios';

import { NOBSCAPI as endpoint } from '../../NOBSCAPI';
import { buildSearchRequest } from '.';

function combineAggsFromResponses(responses: any) {
  return responses.reduce((acc: any, response: any) => ({...acc, ...response.aggregations}), {});
}

// To calculate a disjunctive (sticky) facet correctly, calculate the facet counts as if the filter was not applied.
// Otherwise the list of facet values would collapse to one value: whatever you have filtered on in that facet.
function removeFilterByName(state: RequestState, facetName: string) {
  if (!state.filters) return {...state};
  return {
    ...state,
    filters: state.filters.filter(f => f.field !== facetName)
  };
}

function removeAllFacetsExcept(body: any, facetName: string) {
  return {
    ...body,
    aggs: {
      [facetName]: body.aggs[facetName]
    }
  };
}

async function getDisjunctiveFacetCounts(state: RequestState, disjunctiveFacetNames: string[], index: string) {
  const responses = await Promise.all(
    disjunctiveFacetNames.map(async (facetName) => {  // TO DO: Don't make request if "not" filter is applied for that field.
      const newState = removeFilterByName(state, facetName);
      let body = buildSearchRequest(newState, index);
      body.size = 0;
      body = removeAllFacetsExcept(body, facetName);

      const response = await axios.post(`${endpoint}/search/find/${index}`, {body}, {withCredentials: true});

      return response.data.found;
    })
  );

  return combineAggsFromResponses(responses);
}

// Recalculates facets that need to be disjunctive (sticky). Calculating sticky facets requires a second query for each sticky facet.
export async function applyDisjunctiveFaceting(json: any, state: RequestState, disjunctiveFacetNames: string[], index: string) {
  const disjunctiveFacetCounts = await getDisjunctiveFacetCounts(state, disjunctiveFacetNames, index);

  return {...json, aggregations: {...json.aggregations, ...disjunctiveFacetCounts}};
}