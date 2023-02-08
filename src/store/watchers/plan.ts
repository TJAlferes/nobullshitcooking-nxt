import { all, takeEvery } from 'redux-saga/effects';

import { createPlanSaga, updatePlanSaga, deletePlanSaga } from '../user/plan/sagas';
import { actionTypes } from '../user/plan/types';

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(CREATE_PLAN, createPlanSaga),
    takeEvery(UPDATE_PLAN, updatePlanSaga),
    takeEvery(DELETE_PLAN, deletePlanSaga)
  ]);
}