import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                from '../../config/api';
import { systemMessage, systemMessageClear }       from '../shared/system/state';
import { getMyPlans }                              from '../data/state';
import { actionTypes }                             from './state';
import type { CreatePlan, UpdatePlan, DeletePlan } from './state';

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export function* planWatcher() {
  yield all([
    takeEvery(CREATE_PLAN, createPlanWorker),
    takeEvery(UPDATE_PLAN, updatePlanWorker),
    takeEvery(DELETE_PLAN, deletePlanWorker)
  ]);
}

export function* createPlanWorker({ ownership, plan_upload }: CreatePlan) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/${ownership}/plan/create`,
      plan_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield put(getMyPlans(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePlanWorker({ ownership, plan_update_upload }: UpdatePlan) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/${ownership}/plan/update`,
      plan_update_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield put(getMyPlans(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePlanWorker({ ownership, plan_id }: DeletePlan) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/${ownership}/plan/delete`,
      {
        withCredentials: true,
        data: {plan_id}
      }
    );

    yield put(systemMessage(data.message));
    yield put(getMyPlans(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
