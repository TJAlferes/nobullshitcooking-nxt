import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { getSuggestionsSaga, getResultsSaga } from '../search/sagas';
import { actionTypes } from '../search/types';

const { GET_SUGGESTIONS, GET_RESULTS } = actionTypes;

export function* watchSearch() {
  yield all([
    takeLatest(GET_SUGGESTIONS, getSuggestionsSaga),  // debounces when combined with the 'delay' in 'search/sagas.ts'
    takeLatest(GET_RESULTS, getResultsSaga)
  ]);
}
