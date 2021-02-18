import { all, takeEvery } from 'redux-saga/effects';

import {
  dataGetInitialDataSaga,
  dataGetInitialUserDataSaga,
} from '../data/sagas';
import { actionTypes } from '../data/types';

const {
  DATA_INIT,
  DATA_GET_INITIAL_USER_DATA,
} = actionTypes;

export function* watchData() {
  yield all([
    takeEvery(DATA_INIT, dataGetInitialDataSaga),
    takeEvery(DATA_GET_INITIAL_USER_DATA, dataGetInitialUserDataSaga),

    takeEvery(DATA_GET__SAGA, dataGetSaga),
    takeEvery(DATA_GET__SAGA, dataGetSaga)
  ]);
}