import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { getMyPlansWorker } from '../../private/data/network';
import { actionTypes } from './state';
import type { CreatePublicPlan, UpdatePublicPlan, DeletePublicPlan } from './state';

const { CREATE_PUBLIC_PLAN, UPDATE_PUBLIC_PLAN, DELETE_PUBLIC_PLAN } = actionTypes;

export function* publicPlanWatcher() {
  yield all([
    takeEvery(CREATE_PUBLIC_PLAN, createPublicPlanWorker),
    takeEvery(UPDATE_PUBLIC_PLAN, updatePublicPlanWorker),
    takeEvery(DELETE_PUBLIC_PLAN, deletePublicPlanWorker)
  ]);
}

export function* createPublicPlanWorker({ planInfo }: CreatePublicPlan) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/public/plan/create`,
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

export function* updatePublicPlanWorker({ planInfo }: UpdatePublicPlan) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/public/plan/update`,
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

export function* deletePublicPlanWorker({ plan_id }: DeletePublicPlan) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/public/plan/delete`,
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
