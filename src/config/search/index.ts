import type { APIConnector, RequestState, QueryConfig } from '@elastic/search-ui';
import axios from 'axios';
import type { Store } from 'redux';

import { applyDisjunctiveFaceting, buildAutocompleteState, buildSearchRequest, buildSearchState } from './helpers';
import { NOBSCAPI as endpoint } from '../NOBSCAPI';

export function makeSearchConfig(store: Store) {
  function getFacets() {
    const index = store.getState().search.index;
    if (index === "recipes")
      return {                                        // TO DO: allergies (ingredient_type_name and ingredient fullname)
        cuisine_name:     {type: "value", size: 24},  // TO DO: change size
        method_name:      {type: "value", size: 12},
        recipe_type_name: {type: "value", size: 12},
      };
    if (index === "ingredients") return {ingredient_type_name: {type: "value", size: 18}};
    if (index === "equipments")  return {equipment_type_name: {type: "value", size: 5}}
  }

  function getDisjunctiveFacets() {
    const index = store.getState().search.index;
    if (index === "recipes")     return ["cuisine_name", "method_name", "recipe_type_name"];
    if (index === "ingredients") return ["ingredient_type_name"];
    if (index === "equipments")  return ["equipment_type_name"];
  }

  return {
    onAutocomplete: async function({ searchTerm }: {searchTerm: string;}) {
      const index = store.getState().search.index;

      const response = await axios.post(`${endpoint}/search/autocomplete/${index}`, {searchTerm}, {withCredentials: true});

      const { results } = buildAutocompleteState(response.data.found, index);

      return {autocompletedResults: results};
    },

    onSearch: async function(state: RequestState, queryConfig: QueryConfig) {
      const index = store.getState().search.index;
      const names = getDisjunctiveFacets();

      const response = await axios.post(`${endpoint}/search/find/${index}`, {body: buildSearchRequest(state, index)}, {withCredentials: true});

      const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(response.data.found, state, names, index);

      return buildSearchState(resWithDisjunctiveFacetCounts, state.resultsPerPage, index);
    },

    searchQuery: {
      facets:            getFacets(),
      disjunctiveFacets: getDisjunctiveFacets()
    },

    trackUrlState: false  // ?
  };
}
