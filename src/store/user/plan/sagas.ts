import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetMyPlansSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import { IUserCreatePlan, IUserEditPlan, IUserDeletePlan } from './types';

export function* userCreateNewPlanSaga(action: IUserCreatePlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/plan/create`,
      {planInfo: action.planInfo},
      {withCredentials: true}
    );
    yield put(userMessage(message));
      // if it refreshes too quickly, put a delay here?
    yield call(dataGetMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userEditPlanSaga(action: IUserEditPlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/plan/update`,
      {planInfo: action.planInfo},
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeletePlanSaga(action: IUserDeletePlan) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/plan/delete`,
      {withCredentials: true, data: {id: action.id}}
    );
    yield put(userMessage(message));
    yield call(dataGetMyPlansSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}