import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { actionTypes, Verify }               from './state';

const { VERIFY } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(VERIFY,   userVerifySaga)
  ]);
}

export function* userVerifySaga(action: Verify) {
  try {
    const { email, password, confirmation_code, router } = action;

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/verify`,
      {userInfo: {email, password, confirmation_code}}
    );
    
    if (message === "User account verified.") {
      yield delay(2000);
      yield put(systemMessageClear());
      yield call(() => router.push('/login'));
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
