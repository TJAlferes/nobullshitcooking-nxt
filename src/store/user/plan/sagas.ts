import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../utils/api';
import { getMyPlansSaga }                from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import { actionTypes, CreatePlan, UpdatePlan, DeletePlan } from './types';

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export function* watchPlan() {
  yield all([
    takeEvery(CREATE_PLAN, createPlanSaga),
    takeEvery(UPDATE_PLAN, updatePlanSaga),
    takeEvery(DELETE_PLAN, deletePlanSaga)
  ]);
}

export function* createPlanSaga(action: CreatePlan) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/plan/create`, {planInfo: action.planInfo}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* updatePlanSaga(action: UpdatePlan) {
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

export function* deletePlanSaga(action: DeletePlan) {
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
