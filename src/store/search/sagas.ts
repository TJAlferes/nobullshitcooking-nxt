import axios          from 'axios';
import type { Store } from 'redux';
import { call, put }  from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { setFound } from './actions';
//import type {  } from './types';

export function* autosuggest(term: string) {
  try {
    //const index = this.store.getState().search.index;
    const response = yield call([axios, axios.get], `${endpoint}/search/auto/${index}`);
    yield put(setFound(response.data.found));
  } catch (err) {}
}

//Promise<SearchResponse>
export function* search(state: SearchState) {
  try {
    const { index, term, filters, sorts, currentPage, resultsPerPage } = state;
    const body = {term, filters, sorts, currentPage, resultsPerPage};
    const urlSearchParams = body;  // CONVERT
    const response = yield call([axios, axios.get], `${endpoint}/search/find/${index}/?${urlSearchParams}`);
    yield put(setFound(response.data.found));
    // do all this on the back end
    //const startPage =  totalResults === 0 ? 0 : (current - 1) * resultsPerPage + 1;
    //const endPage =    totalResults < (start + resultsPerPage) ? totalResults : start + resultsPerPage - 1;
    //const totalPages = totalResults === 0 ? 1 : Math.ceil(totalResults / resultsPerPage)
  } catch (err) {}
};
