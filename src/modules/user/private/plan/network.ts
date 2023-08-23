import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { getMyPlansWorker } from '../data/network';
import { actionTypes } from './state';
import type { CreatePrivatePlan, UpdatePrivatePlan, DeletePrivatePlan } from './state';

const { CREATE_PRIVATE_PLAN, UPDATE_PRIVATE_PLAN, DELETE_PRIVATE_PLAN } = actionTypes;

export function* privatePlanWatcher() {
  yield all([
    takeEvery(CREATE_PRIVATE_PLAN, createPrivatePlanWorker),
    takeEvery(UPDATE_PRIVATE_PLAN, updatePrivatePlanWorker),
    takeEvery(DELETE_PRIVATE_PLAN, deletePrivatePlanWorker)
  ]);
}

export function* createPrivatePlanWorker({ planInfo }: CreatePrivatePlan) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/plan/create`,
      {planInfo},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyPlansWorker);  // put action instead???
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePrivatePlanWorker({ planInfo }: UpdatePrivatePlan) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/plan/update`,
      {planInfo},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyPlansWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePrivatePlanWorker({ plan_id }: DeletePrivatePlan) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/plan/delete`,
      {
        withCredentials: true,
        data: {plan_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyPlansWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
