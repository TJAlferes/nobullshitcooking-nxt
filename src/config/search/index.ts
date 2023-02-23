import axios from 'axios';
import type { Store } from 'redux';

import { NOBSCAPI as endpoint } from '../NOBSCAPI';
import type { SearchRequest, SearchResponse, SearchState } from './types';

// TO DO: allergies (ingredient_type_name and ingredient fullname)

// merge with search reducer
export class SearchManager {
  store: Store;

  constructor(store: Store) {
    this.store =         store;
    this.autosuggest = this.autosuggest.bind(this);
    this.search =      this.search.bind(this);
  }

  async autosuggest(state: SearchRequest): Promise<any> {
    const index = this.store.getState().search.index;
    const response = await axios.post(`${endpoint}/search/auto/${index}`, {term: state.term}, {withCredentials: true});
    return response.data.found;
  }

  async search(state: SearchState): Promise<SearchResponse> {
    const index = this.store.getState().search.index;
    const { term, filters, sorts, currentPage, resultsPerPage } = state;
    const body = {term, filters, sorts, currentPage, resultsPerPage};
    const response = await axios.post(`${endpoint}/search/find/${index}`, {body}, {withCredentials: true});
    return response.data.found;

    // do all this on the back end
    const startPage =  totalResults === 0 ? 0 : (current - 1) * resultsPerPage + 1;
    const endPage =    totalResults < (start + resultsPerPage) ? totalResults : start + resultsPerPage - 1;
    const totalPages = totalResults === 0 ? 1 : Math.ceil(totalResults / resultsPerPage)
  };
}

//const offset = (current - 1) * resultsPerPage;       // starting / from
