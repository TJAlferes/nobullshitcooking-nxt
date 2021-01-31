import { all, takeEvery } from 'redux-saga/effects';

import { dataGetInitialDataSaga } from '../data/sagas';
import { actionTypes } from '../data/types';

export function* watchData() {
  yield all([takeEvery(actionTypes.DATA_INIT, dataGetInitialDataSaga)]);
}