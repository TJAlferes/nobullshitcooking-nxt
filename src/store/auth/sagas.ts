import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { removeStorageItem } from '../../utils/storageHelpers';
import { initUser } from '../data/actions';
import { message as authMessage, messageClear, staffDisplay, userDisplay } from './actions';
import type { IUserRegister, IUserVerify, IUserLogin, IUserLogout, IStaffLogin, IStaffLogout } from './types';

export function* staffLoginSaga(action: IStaffLogin) {
  try {
    const { data: { message, staffname } } =
      yield call([axios, axios.post], `${endpoint}/staff/auth/login`, {staffInfo: {email: action.email, password: action.password}}, {withCredentials: true});

    if (message === 'Signed in.') yield put(staffDisplay(staffname));
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

    yield call(removeStorageItem, 'appState');
    yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userLoginSaga(action: IUserLogin) {
  try {
    const { email, password, router } = action;
    const { data: { message, username } } =
      yield call([axios, axios.post], `${endpoint}/user/auth/login`, {userInfo: {email, pass: password}}, {withCredentials: true});

    if (message === 'Signed in.') {
      yield put(userDisplay(username));
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

export function* userLogoutSaga(action: IUserLogout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true});

    yield call(removeStorageItem, 'appState');
    yield put(authMessage(message));
  } catch(err) {
    yield call(removeStorageItem, 'appState');
    //yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(messageClear());
}

export function* userRegisterSaga(action: IUserRegister) {
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
