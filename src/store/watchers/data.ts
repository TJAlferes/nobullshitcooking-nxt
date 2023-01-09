import { all, takeEvery } from 'redux-saga/effects';

import {getInitialDataSaga, getInitialUserDataSaga} from '../data/sagas';
import { actionTypes } from '../data/types';

const {INIT, GET_INITIAL_USER_DATA} = actionTypes;

// TO DO: finish / let Next.js handle now
/*export function* watchData() {
  yield all([
    takeEvery(DATA_INIT, dataGetInitialDataSaga),
    takeEvery(DATA_GET_INITIAL_USER_DATA, dataGetInitialUserDataSaga),

    takeEvery(DATA_GET__SAGA, dataGetSaga),
    takeEvery(DATA_GET__SAGA, dataGetSaga)
  ]);
}*/