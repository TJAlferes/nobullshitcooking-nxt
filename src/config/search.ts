import axios from 'axios';
import { Store } from 'redux';

import {
  applyDisjunctiveFaceting,
  buildAutocompleteState,
  buildSearchRequest,
  buildSearchState
} from '../utils/search';
import { NOBSCAPI as endpoint } from './NOBSCAPI';

// put currentIndex on window?

export function makeSearchConfig(store: Store) {
  /*function getSearchState() {
    const { search } = store.getState();
    return search;
  }
  
  function getFacetsConfig() {
    if (getSearchState().currentIndex === "recipes") {
      return {
        cuisine_name: {type: "value", size: 24},  // change size
        //ingredient_type_names, (for allergies)
        //method_names,
        recipe_type_name: {type: "value", size: 12}
      };
    } else if (getSearchState().currentIndex === "ingredients") {
      return {ingredient_type_name: {type: "value", size: 18}};
    }
  }

  function getDisjunctiveFacetsConfig() {
    if (getSearchState().currentIndex === "recipes") {
      return ["recipe_type_name", "cuisine_name"];
    } else if (getSearchState().currentIndex === "ingredients") {
      return ["ingredient_type_name"];
    }
  }*/

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

      let names;
      if (currentIndex === "recipes") {
        names = ["recipe_type_name", "cuisine_name"];
      }
      if (currentIndex === "ingredients") names = ["ingredient_type_name"];
      if (currentIndex === "equipment") names = ["equipment_type_name"];

      const { data: { found } } = await axios.post(
        `${endpoint}/search/find/${currentIndex}`,
        {body: buildSearchRequest(state, currentIndex)},
        {withCredentials: true}
      );

      const resWithDisjunctiveFacetCounts =
        await applyDisjunctiveFaceting(found, state, names, currentIndex);

      const newState = buildSearchState(
        resWithDisjunctiveFacetCounts,
        state.resultsPerPage,
        currentIndex
      );

      return newState;
    },
    searchQuery: {
      facets: {
        cuisine_name: {type: "value", size: 24},  // change size
        //ingredient_type_names, (for allergies)
        //method_names,
        recipe_type_name: {type: "value", size: 12}
      },
      disjunctiveFacets: ["cuisine_name", "recipe_type_name"]  // any others?
    }
  };
}