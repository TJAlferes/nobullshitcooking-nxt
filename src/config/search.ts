import axios from 'axios';
import { Store } from 'redux';

import {
  applyDisjunctiveFaceting,
  buildAutocompleteState,
  buildSearchRequest,
  buildSearchState
} from '../utils/search';
import { NOBSCAPI as endpoint } from './NOBSCAPI';

export function makeSearchConfig(store: Store) {
  function getCurrIdx() {
    const { search: { currentIndex } } = store.getState();
    return currentIndex;
  }

  function getFacets() {
    const currIdx = getCurrIdx();

    if (currIdx === "recipes") {
      return {
        // TO DO: allergies (ingredient_type_name and ingredient fullname)
        cuisine_name: {type: "value", size: 24},  // TO DO: change size
        method_name: {type: "value", size: 12},
        recipe_type_name: {type: "value", size: 12},
      };
    }
    
    if (currIdx === "ingredients") {
      return {ingredient_type_name: {type: "value", size: 18}};
    }

    if (currIdx === "equipment") {
      return {equipment_type_name: {type: "value", size: 5}}
    }
  }

  function getDisjunctiveFacets() {
    const currIdx = getCurrIdx();

    if (currIdx === "recipes") {
      return ["cuisine_name", "method_name", "recipe_type_name"];
    }
    
    if (currIdx === "ingredients") return ["ingredient_type_name"];

    if (currIdx === "equipment") return ["equipment_type_name"];
  }

  return {
    //debug: true,
    onAutocomplete: async function({ searchTerm }: {searchTerm: string;}) {
      const currIdx = getCurrIdx();

      const { data: { found } } = await axios.post(
        `${endpoint}/search/autocomplete/${currIdx}`,
        {searchTerm},
        {withCredentials: true}
      );

      const { results } = buildAutocompleteState(found, currIdx);

      return {autocompletedResults: results};
    },
    onSearch: async function(state: any) {
      const currIdx = getCurrIdx();
      const names = getDisjunctiveFacets();

      const { data: { found } } = await axios.post(
        `${endpoint}/search/find/${currIdx}`,
        {body: buildSearchRequest(state, currIdx)},
        {withCredentials: true}
      );

      const resWithDisjunctiveFacetCounts =
        await applyDisjunctiveFaceting(found, state, names, currIdx);

      return buildSearchState(
        resWithDisjunctiveFacetCounts,
        state.resultsPerPage,
        currIdx
      );
    },
    searchQuery: {
      facets: getFacets(),
      disjunctiveFacets: getDisjunctiveFacets()
    },
    trackUrlState: false  // ?
  };
}