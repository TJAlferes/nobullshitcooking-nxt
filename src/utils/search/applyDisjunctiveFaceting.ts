import axios from 'axios';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { buildSearchRequest } from './buildSearchRequest';

function combineAggsFromResponses(responses: any) {
  return responses.reduce((acc: any, response: any) => ({
    ...acc,
    ...response.aggregations
  }), {});
}

// To calculate a disjunctive facet correctly, calculate the facet counts as if
// the filter was not applied. Otherwise the list of facet values would collapse
// to one value: whatever you have filtered on in that facet.
function removeFilterByName(state: any, facetName: string) {
  return {
    ...state,
    filters: state.filters.filter((f: any) => f.field !== facetName)
  };
}

function removeAllFacetsExcept(body: any, facetName: string) {
  return {...body, aggs: {[facetName]: body.aggs[facetName]}};
}

function changeSizeToZero(body: any) {
  return {...body, size: 0};
}

async function getDisjunctiveFacetCounts(
  state: any,
  disjunctiveFacetNames: any,
  currIdx: string
) {
  let responses: any = [];

  // TO DO: don't make request if "not" filter is currently applied
  // TO DO: await Promise.all([])
  // TO DO: optimize this by *not* executing a request if "not" filter is
  // currently applied for that field.
  disjunctiveFacetNames.map(async (facetName: string) => {
    const newState = removeFilterByName(state, facetName);
    let body = buildSearchRequest(newState, currIdx);
    body = changeSizeToZero(body);
    body = removeAllFacetsExcept(body, facetName);

    const { data: { found } } = await axios.post(
      `${endpoint}/search/find/${currIdx}`,
      {body},
      {withCredentials: true}
    );

    responses.push(found);
  });

  return combineAggsFromResponses(responses);
}

// Recalculates facets that need to be disjunctive (sticky).
// Calculating sticky facets requires a second query for each sticky facet.
export async function applyDisjunctiveFaceting(
  json: any,
  state: any,
  disjunctiveFacetNames: any,
  currIdx: string
) {
  const disjunctiveFacetCounts =
    await getDisjunctiveFacetCounts(state, disjunctiveFacetNames, currIdx);

  return {
    ...json,
    aggregations: {
      ...json.aggregations,
      ...disjunctiveFacetCounts
    }
  };
}