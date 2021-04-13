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
      const { search } = store.getState();
      const res = await axios.post(
        `${endpoint}/search/autocomplete/${search.currentIndex}`,
        {searchTerm},
        {withCredentials: true}
      );
      const newState = buildAutocompleteState(res.data.found, search.currentIndex);
      return {autocompletedResults: newState.results};
    },
    onSearch: async function(state: any) {  // JSON.stringify()?
      const { search } = store.getState();

      if (search.currentIndex === "recipes") {

        const res = await axios.post(
          `${endpoint}/search/find/recipes`,
          {body: buildSearchRequest(state, "recipes")},
          {withCredentials: true}
        );
        const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
          res.data.found,
          state,
          ["recipe_type_name", "cuisine_name"],
          "recipes"
        );
        const newState = buildSearchState(
          resWithDisjunctiveFacetCounts,
          state.resultsPerPage,
          "recipes"
        );

        return newState;

      } else if (search.currentIndex === "ingredients") {

        const res = await axios.post(
          `${endpoint}/search/find/ingredients`,
          {body: buildSearchRequest(state, "ingredients")},
          {withCredentials: true}
        );
        const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
          res.data.found,
          state,
          ["ingredient_type_name"],
          "ingredients"
        );
        const newState = buildSearchState(
          resWithDisjunctiveFacetCounts,
          state.resultsPerPage,
          "ingredients"
        );

        return newState;

      } else if (search.currentIndex === "equipment") {

        const res = await axios.post(
          `${endpoint}/search/find/equipment`,
          {body: buildSearchRequest(state, "equipment")},
          {withCredentials: true}
        );
        const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
          res.data.found,
          state,
          ["equipment_type_name"],
          "equipment"
        );
        const newState = buildSearchState(
          resWithDisjunctiveFacetCounts,
          state.resultsPerPage,
          "equipment"
        );

        return newState;
        
      }
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