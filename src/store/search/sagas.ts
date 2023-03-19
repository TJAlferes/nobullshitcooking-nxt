import axios                        from 'axios';
import { call, delay, put, select } from 'redux-saga/effects';

import { endpoint }                          from '../../utils/api';
import { setResults, setSuggestions }        from './actions';
import type { IGetResults, IGetSuggestions } from './types';

export function* getSuggestionsSaga(action: IGetSuggestions) {
  try {
    yield delay(1250);  // debounces when combined with the 'takeLatest' in 'watchers/search.ts'
    const index = (yield select(state => state.search.index)) as string;
    if (action.term.length < 3) return;
    const { data } = yield call([axios, axios.get], `${endpoint}/search/auto/${index}?term=${action.term}`);
    yield put(setSuggestions(data.found));
  } catch (err) {}
}

export function* getResultsSaga(action: IGetResults) {
  try {
    yield delay(500);
    const { searchParams, router } = action;
    const index = (yield select(state => state.search.index)) as string;
    const idx = index === "equipment" ? "equipments" : index;
    const { data } = yield call([axios, axios.get], `${endpoint}/search/find/${index}?${searchParams}`);
    yield put(setResults(data.found));
    yield call([router, router.push], `/${idx}?${searchParams}`);  //yield call(() => router.push(`/${index}?${searchParams}`));
  } catch (err) {}
}
