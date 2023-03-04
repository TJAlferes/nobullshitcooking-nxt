import axios          from 'axios';
import { call, put, select }  from 'redux-saga/effects';

import { endpoint } from '../../utils/api';
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

export function* getResultsSaga(action: IGetResults) {
  try {
    const index = (yield select(state => state.search.index)) as RootState;

    const { data } = yield call([axios, axios.get], `${endpoint}/search/find/${index}/?${action.searchParams}`);
    
    yield put(setResults(data.found));
  } catch (err) {}
};
