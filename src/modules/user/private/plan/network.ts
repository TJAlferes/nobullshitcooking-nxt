import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../config/api';
import { getMyPlansSaga }                from '../../data/sagas';
import { systemMessage, systemMessageClear } from '../../../modules/shared/system-message/state';
import { actionTypes } from './state';
import type { CreatePlan, UpdatePlan, DeletePlan } from './state';

// TO DO: split into private and public

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(CREATE_PLAN, createPlanSaga),
    takeEvery(UPDATE_PLAN, updatePlanSaga),
    takeEvery(DELETE_PLAN, deletePlanSaga)
  ]);
}

export function* createPlanSaga({ planInfo }: CreatePlan) {
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

export function* updatePlanSaga({ planInfo }: UpdatePlan) {
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

export function* deletePlanSaga({ plan_id }: DeletePlan) {
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
