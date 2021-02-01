import { all, takeEvery } from 'redux-saga/effects';

import { dataGetMyPlansSaga } from '../data/sagas';
import {
  userCreateNewPlanSaga,
  userEditPlanSaga,
  userDeletePlanSaga
} from '../user/plan/sagas';
import { actionTypes } from '../user/plan/types';

const {
  USER_CREATE_NEW_PLAN,
  USER_CREATE_NEW_PLAN_SUCCEEDED,
  USER_EDIT_PLAN,
  USER_EDIT_PLAN_SUCCEEDED,
  USER_DELETE_PLAN,
  USER_DELETE_PLAN_SUCCEEDED
} = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(USER_CREATE_NEW_PLAN, userCreateNewPlanSaga),
    takeEvery(USER_CREATE_NEW_PLAN_SUCCEEDED, dataGetMyPlansSaga),

    takeEvery(USER_EDIT_PLAN, userEditPlanSaga),
    takeEvery(USER_EDIT_PLAN_SUCCEEDED, dataGetMyPlansSaga),
    
    takeEvery(USER_DELETE_PLAN, userDeletePlanSaga),
    takeEvery(USER_DELETE_PLAN_SUCCEEDED, dataGetMyPlansSaga)
  ]);
}