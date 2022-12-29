import axios from 'axios';
import { Store } from 'redux';

import { applyDisjunctiveFaceting, buildAutocompleteState, buildSearchRequest, buildSearchState } from '../utils/search';
import { NOBSCAPI as endpoint } from './NOBSCAPI';

export function makeSearchConfig(store: Store) {
  function getFacets() {
    const index = store.getState().search.currentIndex;
    if (index === "recipes") {
      return {                                    // TO DO: allergies (ingredient_type_name and ingredient fullname)
        cuisine_name: {type: "value", size: 24},  // TO DO: change size
        method_name: {type: "value", size: 12},
        recipe_type_name: {type: "value", size: 12},
      };
    }
    if (index === "ingredients") return {ingredient_type_name: {type: "value", size: 18}};
    if (index === "equipment")   return {equipment_type_name: {type: "value", size: 5}}
  }

  function getDisjunctiveFacets() {
    const index = store.getState().search.currentIndex;
    if (index === "recipes")     return ["cuisine_name", "method_name", "recipe_type_name"];
    if (index === "ingredients") return ["ingredient_type_name"];
    if (index === "equipment")   return ["equipment_type_name"];
  }

  return {
    //debug: true,

    onAutocomplete: async function({ searchTerm }: {searchTerm: string;}) {
      const index = store.getState().search.currentIndex;
      const { data: { found } } = await axios.post(
        `${endpoint}/search/autocomplete/${index}`,
        {searchTerm},
        {withCredentials: true}
      );
      const { results } = buildAutocompleteState(found, index);

      return {autocompletedResults: results};
    },

    onSearch: async function(state: any) {
      const index = store.getState().search.currentIndex;
      const names = getDisjunctiveFacets();
      const { data: { found } } = await axios.post(
        `${endpoint}/search/find/${index}`,
        {body: buildSearchRequest(state, index)},
        {withCredentials: true}
      );
      const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(found, state, names, index);

      return buildSearchState(resWithDisjunctiveFacetCounts, state.resultsPerPage, index);
    },

    searchQuery: {facets: getFacets(), disjunctiveFacets: getDisjunctiveFacets()},

    trackUrlState: false  // ?
  };
}