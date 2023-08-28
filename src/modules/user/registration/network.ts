import axios from 'axios';
import { call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { systemMessage, systemMessageClear } from '../../shared/system/state';
import { actionTypes, Register }             from './state';

const { REGISTER } = actionTypes;

// WHY DOES THIS NEED TO BE IN REDUX?

export function* userRegistrationWatcher() {
  yield takeEvery(REGISTER, userRegisterWorker);
}

export function* userRegisterWorker(action: Register) {
  try {
    const { email, password, username, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/registration`,
      {userInfo: {email, password, username}}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'User account created.') {
      yield call([router, router.push], '/user/confirm');
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
