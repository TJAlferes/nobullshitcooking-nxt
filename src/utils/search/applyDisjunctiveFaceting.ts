import axios from 'axios';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { buildSearchRequest } from './buildSearchRequest';

function combineAggsFromResponses(responses: any) {
  return responses.reduce((acc: any, response: any) => ({
    ...acc,
    ...response.aggregations
  }), {});
}

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
  currentIndex: string
) {
  let responses: any = [];

  // TO DO: don't make request if "not" filter is currently applied
  // TO DO: await Promise.all([])
  disjunctiveFacetNames.map(async (facetName: string) => {
    const newState = removeFilterByName(state, facetName);
    let body = buildSearchRequest(newState, currentIndex);
    body = changeSizeToZero(body);
    body = removeAllFacetsExcept(body, facetName);

    const { data: { found } } = await axios.post(
      `${endpoint}/search/find/${currentIndex}`,
      {body},
      {withCredentials: true}
    );

    responses.push(found);
  });

  return combineAggsFromResponses(responses);
}

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