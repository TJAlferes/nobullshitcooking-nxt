import axios from 'axios';

import { NOBSCAPI as endpoint } from '../../NOBSCAPI';
import { buildSearchRequest } from '.';

function combineAggsFromResponses(responses: any) {
  return responses.reduce((acc: any, response: any) => ({...acc, ...response.aggregations}), {});
}

// To calculate a disjunctive (sticky) facet correctly, calculate the facet counts as if the filter was not applied.
// Otherwise the list of facet values would collapse to one value: whatever you have filtered on in that facet.
function removeFilterByName(state: any, facetName: string) {
  return {...state, filters: state.filters.filter((f: any) => f.field !== facetName)};
}

function removeAllFacetsExcept(body: any, facetName: string) {
  return {...body, aggs: {[facetName]: body.aggs[facetName]}};
}

async function getDisjunctiveFacetCounts(state: any, disjunctiveFacetNames: any, index: string) {
  const responses: any = [];

  disjunctiveFacetNames.map(async (facetName: string) => {  // TO DO: Don't make request if "not" filter is applied for that field.  Perhaps use await Promise.all([])
    const newState = removeFilterByName(state, facetName);

    let body = buildSearchRequest(newState, index);
    body.size = 0;
    body = removeAllFacetsExcept(body, facetName);

    const response = await axios.post(`${endpoint}/search/find/${index}`, {body}, {withCredentials: true});

    responses.push(response.data.found);
  });

  return combineAggsFromResponses(responses);
}

// Recalculates facets that need to be disjunctive (sticky).
// Calculating sticky facets requires a second query for each sticky facet.
export async function applyDisjunctiveFaceting(json: any, state: any, disjunctiveFacetNames: any, index: string) {
  const disjunctiveFacetCounts = await getDisjunctiveFacetCounts(state, disjunctiveFacetNames, index);

  return {...json, aggregations: {...json.aggregations, ...disjunctiveFacetCounts}};
}