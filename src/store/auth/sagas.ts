import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }   from '../../utils/api';
import { removeItem } from '../../utils/storage';
import { initUser }   from '../data/actions';
import { message as authMessage, messageClear, authenticate } from './actions';
import { actionTypes, Register, Verify, Login, Logout } from './types';

const { REGISTER, VERIFY, LOGIN, LOGOUT } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(REGISTER, userRegisterSaga),
    takeEvery(VERIFY,   userVerifySaga),

    takeEvery(LOGIN,    userLoginSaga),
    takeEvery(LOGOUT,   userLogoutSaga)
  ]);
}

export function* userRegisterSaga(action: Register) {
  try {
    const { email, password, username, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/register`, {userInfo: {email, password, username}});

    if (message === 'User account created.') {
      yield delay(2000);
      yield put(messageClear());
      yield call(() => router.push('/verify'));
    } else {
      yield put(authMessage(message));
      yield delay(4000);
      yield put(messageClear());
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
    yield delay(4000);
    yield put(messageClear());
  }
}

export function* userVerifySaga(action: Verify) {
  try {
    const { email, password, confirmation_code, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/verify`, {userInfo: {email, password, confirmation_code}});
    
    if (message === "User account verified.") {
      yield delay(2000);
      yield put(messageClear());
      yield call(() => router.push('/login'));
    } else {
      yield put(authMessage(message));
      yield delay(4000);
      yield put(messageClear());
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
    yield delay(4000);
    yield put(messageClear());
  }
}

export function* userLoginSaga(action: Login) {
  try {
    const { email, password, router } = action;
    const { data: { message, username } } =
      yield call([axios, axios.post], `${endpoint}/user/auth/login`, {userInfo: {email, pass: password}}, {withCredentials: true});

    if (message === 'Signed in.') {
      yield put(authenticate(username));
      yield put(initUser());
      yield call([router, router.push], '/dashboard');  //yield call(() => router.push('/dashboard'));
    }
    else yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userLogoutSaga(action: Logout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true});

    yield call(removeItem, 'appState');
    yield put(authMessage(message));
  } catch(err) {
    yield call(removeItem, 'appState');
  }

  yield delay(4000);
  yield put(messageClear());
}
