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
  function getFacets() {
    const { search: { currentIndex } } = store.getState();

    if (currentIndex === "recipes") {
      return {
        // TO DO: allergies (ingredient_type_name and ingredient fullname)
        cuisine_name: {type: "value", size: 24},  // TO DO: change size
        method_name: {type: "value", size: 12},
        recipe_type_name: {type: "value", size: 12},
      };
    }
    
    if (currentIndex === "ingredients") {
      return {ingredient_type_name: {type: "value", size: 18}};
    }

    if (currentIndex === "equipment") {
      return {equipment_type_name: {type: "value", size: 5}}
    }
  }

  function getDisjunctiveFacets() {
    const { search: { currentIndex } } = store.getState();

    if (currentIndex === "recipes") {
      return ["cuisine_name", "method_name", "recipe_type_name"];
    }
    
    if (currentIndex === "ingredients") return ["ingredient_type_name"];

    if (currentIndex === "equipment") return ["equipment_type_name"];
  }

  return {
    //debug: true,
    trackUrlState: false,  // ?
    onResultClick: function() {
      //console.log('clicked!');
    },
    onAutocompleteResultClick: function() {
      //console.log('clicked!');
    },
    onAutocomplete: async function({ searchTerm }: {searchTerm: string;}) {  // JSON.stringify()?
      const { search: { currentIndex } } = store.getState();

      const { data: { found } } = await axios.post(
        `${endpoint}/search/autocomplete/${currentIndex}`,
        {searchTerm},
        {withCredentials: true}
      );

      const { results } = buildAutocompleteState(found, currentIndex);

      return {autocompletedResults: results};
    },
    onSearch: async function(state: any) {  // JSON.stringify()?
      const { search: { currentIndex } } = store.getState();
      const names = getDisjunctiveFacets();

      const { data: { found } } = await axios.post(
        `${endpoint}/search/find/${currentIndex}`,
        {body: buildSearchRequest(state, currentIndex)},
        {withCredentials: true}
      );

      const resWithDisjunctiveFacetCounts =
        await applyDisjunctiveFaceting(found, state, names, currentIndex);

      return buildSearchState(
        resWithDisjunctiveFacetCounts,
        state.resultsPerPage,
        currentIndex
      );
    },
    searchQuery: {
      facets: getFacets(),
      disjunctiveFacets: getDisjunctiveFacets()
    }
  };
}