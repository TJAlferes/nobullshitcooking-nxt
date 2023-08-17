import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }   from '../../../config/api';
import { removeItem } from '../../../utils/storage';
import { initUser }   from '../data/actions';

import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { authenticate, actionTypes }         from './state';
import type { Login, Logout }                from './state';

const { LOGIN, LOGOUT } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(LOGIN,  userLoginSaga),
    takeEvery(LOGOUT, userLogoutSaga)
  ]);
}

export function* userLoginSaga(action: Login) {
  try {
    const { email, password, router } = action;

    const { data: { message, username } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/login`,
      {userInfo: {email, pass: password}},
      {withCredentials: true}
    );

    if (message === 'Signed in.') {
      yield put(authenticate(username));
      yield put(initUser());
      yield call([router, router.push], '/dashboard');  //yield call(() => router.push('/dashboard'));
    }
    else yield put(systemMessage(message));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* userLogoutSaga(action: Logout) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/logout`,
      {},
      {withCredentials: true}
    );

    yield call(removeItem, 'appState');
    yield put(systemMessage(message));
  } catch(err) {
    yield call(removeItem, 'appState');
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
