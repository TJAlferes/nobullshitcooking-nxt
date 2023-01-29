import { all, takeEvery } from 'redux-saga/effects';

import {getInitialDataSaga, getInitialUserDataSaga} from '../data/sagas';
import { actionTypes } from '../data/types';

const { INIT, INIT_USER } = actionTypes;

// TO DO: finish / let Next.js/RTKQ handle now
export function* watchData() {
  yield all([
    takeEvery(INIT, getInitialDataSaga),
    takeEvery(INIT_USER, getInitialUserDataSaga),

    //takeEvery(, dataGetSaga),
    //takeEvery(, dataGetSaga)
  ]);
}