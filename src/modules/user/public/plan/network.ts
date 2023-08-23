import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../../config/api';
import { getMyPlansSaga }                from '../../../shared/data/network';
import { systemMessage, systemMessageClear } from '../../../shared/system-message/state';
import { actionTypes } from './state';
import type { CreatePublicPlan, UpdatePublicPlan, DeletePublicPlan } from './state';

const { CREATE_PUBLIC_PLAN, UPDATE_PUBLIC_PLAN, DELETE_PUBLIC_PLAN } = actionTypes;

export function* watchUserPublicPlan() {
  yield all([
    takeEvery(CREATE_PUBLIC_PLAN, createPublicPlanSaga),
    takeEvery(UPDATE_PUBLIC_PLAN, updatePublicPlanSaga),
    takeEvery(DELETE_PUBLIC_PLAN, deletePublicPlanSaga)
  ]);
}

export function* createPublicPlanSaga({ planInfo }: CreatePublicPlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/public/plan/create`,
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

export function* updatePublicPlanSaga({ planInfo }: UpdatePublicPlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/public/plan/update`,
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

export function* deletePublicPlanSaga({ plan_id }: DeletePublicPlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/public/plan/delete`,
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
