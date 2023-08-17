import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { actionTypes, Confirm }               from './state';

const { CONFIRM } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(CONFIRM, userConfirmSaga)
  ]);
}

export function* userConfirmSaga(action: Confirm) {
  try {
    const { confirmation_code, router } = action;

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/confirmation`,
      {userInfo: {confirmation_code}}
    );
    
    if (message === "User account confirmed.") {
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
