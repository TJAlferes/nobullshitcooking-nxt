import { all, takeEvery } from 'redux-saga/effects';

import { getSuggestionsSaga, getResultsSaga } from '../search/sagas';
import { actionTypes } from '../search/types';

const { GET_SUGGESTIONS, GET_RESULTS } = actionTypes;

export function* watchSearch() {
  yield all([
    takeEvery(GET_SUGGESTIONS, getSuggestionsSaga),
    takeEvery(GET_RESULTS, getResultsSaga)
  ]);
}
