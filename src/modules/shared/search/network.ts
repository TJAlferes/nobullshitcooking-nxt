import axios from 'axios';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { endpoint }                                from '../../../config/api';
import { setResults, setSuggestions, actionTypes } from './state';
import type { GetResults, GetSuggestions }         from './state';

const { GET_SUGGESTIONS, GET_RESULTS } = actionTypes;

export function* searchWatcher() {
  yield all([
    takeLatest(GET_SUGGESTIONS, getSuggestionsWorker),  // debounces when combined with the 'delay' below
    takeLatest(GET_RESULTS,     getResultsWorker)       // debounces when combined with the 'delay' below
  ]);
}

export function* getSuggestionsWorker(action: GetSuggestions) {
  try {

    yield delay(1250);  // debounces when combined with the 'takeLatest' above

    const index = (yield select(state => state.search.index)) as string;

    if (action.term.length < 3) return;

    const { data } = yield call(
      [axios, axios.get],
      `${endpoint}/search/autosuggest/${index}?term=${action.term}`
    );

    yield put(setSuggestions(data.found));

  } catch (err) {}
}

export function* getResultsWorker(action: GetResults) {
  try {

    yield delay(250);  // debounces when combined with the 'takeLatest' above

    const { search_params, router } = action;

    const index = (yield select(state => state.search.index)) as string;

    const idx = index === "equipment" ? "equipments" : index;

    const { data } = yield call(
      [axios, axios.get],
      `${endpoint}/search/find/${index}?${search_params}`
    );

    yield put(setResults(data.found));

    yield call([router, router.push], `/${idx}?${search_params}`);

  } catch (err) {}
}
