import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { endpoint } from '../../../utils/api';
import { getMyPlansSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type { ICreatePlan, IUpdatePlan, IDeletePlan } from './types';

export function* createPlanSaga(action: ICreatePlan) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/plan/create`, {planInfo: action.planInfo}, {withCredentials: true});

    yield put(userMessage(message));
    // if it refreshes too quickly, put a delay here?
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* updatePlanSaga(action: IUpdatePlan) {
  try {
    const { data: { message } } = yield call([axios, axios.put], `${endpoint}/user/plan/update`, {planInfo: action.planInfo}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deletePlanSaga(action: IDeletePlan) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/plan/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}