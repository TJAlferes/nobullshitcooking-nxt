import { all, takeEvery } from 'redux-saga/effects';

import {
  userCreateNewPlanSaga,
  userEditPlanSaga,
  userDeletePlanSaga
} from '../user/plan/sagas';
import { actionTypes } from '../user/plan/types';

const { USER_CREATE_NEW_PLAN, USER_EDIT_PLAN, USER_DELETE_PLAN } = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(USER_CREATE_NEW_PLAN, userCreateNewPlanSaga),
    takeEvery(USER_EDIT_PLAN, userEditPlanSaga),
    takeEvery(USER_DELETE_PLAN, userDeletePlanSaga)
  ]);
}