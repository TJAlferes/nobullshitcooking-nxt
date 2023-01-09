import { all, takeEvery } from 'redux-saga/effects';

import { createNewPlanSaga, editPlanSaga, deletePlanSaga } from '../user/plan/sagas';
import { actionTypes } from '../user/plan/types';

const { CREATE_NEW_PLAN, EDIT_PLAN, DELETE_PLAN } = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(CREATE_NEW_PLAN, createNewPlanSaga),
    takeEvery(EDIT_PLAN,       editPlanSaga),
    takeEvery(DELETE_PLAN,     deletePlanSaga)
  ]);
}