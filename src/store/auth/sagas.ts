import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { removeStorageItem } from '../../utils/storageHelpers';
import { message as authMessage, messageClear, staffDisplay, userDisplay } from './actions';
import type { IUserRegister, IUserVerify, IUserLogin, IUserLogout, IStaffLogin, IStaffLogout } from './types';

export function* staffLoginSaga(action: IStaffLogin) {
  try {
    const { data: { message, staffname } } =
      yield call([axios, axios.post], `${endpoint}/staff/auth/login`, {staffInfo: {email: action.email, password: action.password}}, {withCredentials: true});

    if (message == 'Signed in.') yield put(staffDisplay(staffname));
    else yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* staffLogoutSaga(action: IStaffLogout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/staff/auth/logout`, {}, {withCredentials: true});

    if (message == 'Signed out.') yield call(removeStorageItem, 'appState');
    else {
      yield call(removeStorageItem, 'appState');  // clear their browser anyway
      yield put(authMessage(message));
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userLoginSaga(action: IUserLogin) {
  try {
    const { data: { message, username } } =
      yield call([axios, axios.post], `${endpoint}/user/auth/login`, {userInfo: {email: action.email, pass: action.password}}, {withCredentials: true});

    if (message == 'Signed in.') yield put(userDisplay(username));
    else yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userLogoutSaga(action: IUserLogout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true});

    if (message == 'Signed out.') yield call(removeStorageItem, 'appState');
    else {
      yield call(removeStorageItem, 'appState');  // clear their browser anyway
      yield put(authMessage(message));
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userRegisterSaga(action: IUserRegister) {
  try {
    const { email, password, username, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/register`, {userInfo: {email, password, username}});

    if (message == 'User account created.') {
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

export function* userVerifySaga(action: IUserVerify) {
  try {
    const { email, password, confirmationCode, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/verify`, {userInfo: {email, password, confirmationCode}});
    
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