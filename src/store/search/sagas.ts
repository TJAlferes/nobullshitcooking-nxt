import axios from 'axios';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { endpoint }                                from '../../utils/api';
import { setResults, setSuggestions }              from './actions';
import { actionTypes, GetResults, GetSuggestions } from './types';

const { GET_SUGGESTIONS, GET_RESULTS } = actionTypes;

export function* watchSearch() {
  yield all([
    takeLatest(GET_SUGGESTIONS, getSuggestionsSaga),  // debounces when combined with the 'delay' in 'search/sagas.ts'
    takeLatest(GET_RESULTS, getResultsSaga)
  ]);
}

export function* getSuggestionsSaga(action: GetSuggestions) {
  try {
    yield delay(1250);  // debounces when combined with the 'takeLatest' in 'watchers/search.ts'
    const index = (yield select(state => state.search.index)) as string;
    if (action.term.length < 3) return;
    const { data } = yield call([axios, axios.get], `${endpoint}/search/auto/${index}?term=${action.term}`);
    yield put(setSuggestions(data.found));
  } catch (err) {}
}

export function* getResultsSaga(action: GetResults) {
  try {
    yield delay(250);  // debounces when combined with the 'takeLatest' in 'watchers/search.ts'
    const { searchParams, router } = action;
    const index = (yield select(state => state.search.index)) as string;
    const idx = index === "equipment" ? "equipments" : index;
    const { data } = yield call([axios, axios.get], `${endpoint}/search/find/${index}?${searchParams}`);
    yield put(setResults(data.found));
    yield call([router, router.push], `/${idx}?${searchParams}`);
  } catch (err) {}
}
