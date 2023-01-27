import type { APIConnector, RequestState, QueryConfig, ResponseState, AutocompleteQueryConfig, AutocompleteResponseState } from '@elastic/search-ui';
import axios from 'axios';
import type { Store } from 'redux';

import { applyDisjunctiveFaceting, buildAutocompleteState, buildSearchRequest, buildSearchState } from './helpers';
import { NOBSCAPI as endpoint } from '../NOBSCAPI';

// TO DO: allergies (ingredient_type_name and ingredient fullname)

export class SearchConnector implements APIConnector {
  store: Store;

  constructor(store: Store) {
    this.store =                store;
    this.getDisjunctiveFacets = this.getDisjunctiveFacets.bind(this);
  }

  async onAutocomplete(state: RequestState, queryConfig: AutocompleteQueryConfig): Promise<any> {
    const index = this.store.getState().search.index;

      const response = await axios.post(`${endpoint}/search/autocomplete/${index}`, {searchTerm: state.searchTerm}, {withCredentials: true});

      const { results } = buildAutocompleteState(response.data.found, index);

      return {autocompletedResults: results};
  }

  async onAutocompleteResultClick(params: any) {
    
  }

  async onSearch(state: RequestState, queryConfig: QueryConfig): Promise<any> {
    const index = this.store.getState().search.index;
    const names = this.getDisjunctiveFacets();

    const response = await axios.post(`${endpoint}/search/find/${index}`, {body: buildSearchRequest(state, index)}, {withCredentials: true});

    const resWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(response.data.found, state, names, index);

    return buildSearchState(resWithDisjunctiveFacetCounts, state.resultsPerPage, index);
  };

  async onResultClick(params: any) {
    
  }

  getDisjunctiveFacets() {
    const index = this.store.getState().search.index;
    if (index === "recipes")     return ["cuisine_name", "method_name", "recipe_type_name"];
    if (index === "ingredients") return ["ingredient_type_name"];
    if (index === "equipments")  return ["equipment_type_name"];
  }
}

export function makeSearchConfig(store: Store) {
  function getFacets() {
    const index = store.getState().search.index;
    if (index === "recipes")     return {cuisine_name: {type: "value", size: 24}, method_name: {type: "value", size: 12}, recipe_type_name: {type: "value", size: 12}};
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
    searchQuery: {facets: getFacets(), disjunctiveFacets: getDisjunctiveFacets()},
    trackUrlState: false  // ?
  };
}
