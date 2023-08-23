import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../../config/api';
import { getMyPlansSaga }                from '../../data/sagas';
import { systemMessage, systemMessageClear } from '../../../shared/system-message/state';
import { actionTypes } from './state';
import type { CreatePlan, UpdatePlan, DeletePlan } from './state';

const { CREATE_PRIVATE_PLAN, UPDATE_PRIVATE_PLAN, DELETE_PRIVATE_PLAN } = actionTypes;

export function* watchUserPrivatePlan() {
  yield all([
    takeEvery(CREATE_PRIVATE_PLAN, createPrivatePlanSaga),
    takeEvery(UPDATE_PRIVATE_PLAN, updatePrivatePlanSaga),
    takeEvery(DELETE_PRIVATE_PLAN, deletePrivatePlanSaga)
  ]);
}

export function* createPrivatePlanSaga({ planInfo }: CreatePlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/plan/create`,
      {planInfo},
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePrivatePlanSaga({ planInfo }: UpdatePlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/plan/update`,
      {planInfo},
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePrivatePlanSaga({ plan_id }: DeletePlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/plan/delete`,
      {
        withCredentials: true,
        data: {plan_id}
      }
    );

    yield put(systemMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
