import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }   from '../../../config/api';
import { removeItem } from '../../general/localStorage';
import { initUser }   from '../data/actions';

import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { authenticate, actionTypes }         from './state';
import type { Login, Logout }                from './state';

const { LOGIN, LOGOUT } = actionTypes;

export function* userAuthenticationWatcher() {
  yield all([
    takeEvery(LOGIN,  userLoginWorker),
    takeEvery(LOGOUT, userLogoutWorker)
  ]);
}

export function* userLoginWorker(action: Login) {
  try {
    const { email, password, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/authentication/login`,
      {userInfo: {email, password}},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'Signed in.') {
      yield put(authenticate(data.username));
      yield put(initUser());
      yield call([router, router.push], '/dashboard');
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* userLogoutWorker(action: Logout) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/authentication/logout`,
      {},
      {withCredentials: true}
    );

    yield call(removeItem, 'appState');
    yield put(systemMessage(data.message));
  } catch(err) {
    yield call(removeItem, 'appState');
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
