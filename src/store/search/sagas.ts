import axios          from 'axios';
import { call, put, select }  from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import type { RootState } from '..';
import { setResults, setSuggestions } from './actions';
import type { IGetResults, IGetSuggestions } from './types';

export function* getSuggestionsSaga(action: IGetSuggestions) {
  try {
    const index = (yield select(state => state.search.index)) as RootState;
    const term =  (yield select(state => state.search.term)) as RootState;

    const { data } = yield call([axios, axios.get], `${endpoint}/search/auto/${index}?term=${term}`);

    yield put(setSuggestions(data.found));
  } catch (err) {}
}

//state: SearchState
export function* getResultsSaga(action: IGetResults) {
  try {
    const index =           (yield select(state => state.search.index)) as RootState;
    const term =            (yield select(state => state.search.term)) as RootState;
    const filters =         (yield select(state => state.search.filters)) as RootState;
    const sorts =           (yield select(state => state.search.sorts)) as RootState;
    const currentPage =     (yield select(state => state.search.currentPage)) as RootState;
    const resultsPerPage =  (yield select(state => state.search.resultsPerPage)) as RootState;

    const body = {term, filters, sorts, currentPage, resultsPerPage};
    const urlSearchParams = body;  // CONVERT
    const { data } = yield call([axios, axios.get], `${endpoint}/search/find/${index}/?${urlSearchParams}`);
    yield put(setResults(data.found));
    // do all this on the back end
    //const startPage =  totalResults === 0 ? 0 : (current - 1) * resultsPerPage + 1;
    //const endPage =    totalResults < (start + resultsPerPage) ? totalResults : start + resultsPerPage - 1;
    //const totalPages = totalResults === 0 ? 1 : Math.ceil(totalResults / resultsPerPage)
  } catch (err) {}
};
