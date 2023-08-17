import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../config/api';
import { systemMessage, systemMessageClear } from '../shared/system-message/state';
import { actionTypes, Register }             from './state';

const { REGISTER } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(REGISTER, userRegisterSaga)
  ]);
}

export function* userRegisterSaga(action: Register) {
  try {
    const { email, password, username, router } = action;

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/registration`,
      {userInfo: {email, password, username}}
    );

    if (message === 'User account created.') {
      yield delay(2000);
      yield put(systemMessageClear());
      yield call(() => router.push('/confirm'));
    } else {
      yield put(systemMessage(message));
      yield delay(4000);
      yield put(systemMessageClear());
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
    yield delay(4000);
    yield put(systemMessageClear());
  }
}
