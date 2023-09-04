import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { workerHelper }                      from '../../shared/helpers';
import { systemMessage, systemMessageClear } from '../../shared/system/state';
import { actionTypes } from './state';
import type { Register, UpdateEmail, UpdatePassword, UpdateUsername, DeleteUser } from './state';

const { REGISTER } = actionTypes;

export function* userRegistrationWatcher() {
  yield all([
    takeEvery(REGISTER,        userRegisterWorker),
    takeEvery(UPDATE_EMAIL,    userUpdateEmailWorker),
    takeEvery(UPDATE_PASSWORD, userUpdatePasswordWorker),
    takeEvery(UPDATE_USERNAME, userUpdateUsernameWorker),
    takeEvery(DELETE_USER,     userDeleteWorker)
  ]);
}

// create account
export function* userRegisterWorker(action: Register) {
  try {
    const { email, password, username, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/registration`,
      {email, password, username}
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

export function* userUpdateEmailWorker(action: UpdateEmail) {
  try {
    const { new_email, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/create`,
      {new_email},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'Email updated.') {
      yield call([router, router.push], '/user/dashboard');
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* userUpdatePasswordWorker(action: UpdatePassword) {
  try {
    const { new_password, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/create`,
      {new_password},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'Password updated.') {
      yield call([router, router.push], '/user/dashboard');
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

// IDK... does this workerHelper make testing harder???

export function* userUpdateUsernameWorker(action: UpdateUsername) {
  function* fn() {
    const { new_username, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/create`,
      {new_username},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'Email updated.') {
      yield call([router, router.push], '/user/dashboard');
    }
  }

  yield* workerHelper(fn);
}

export function* userDeleteWorker(action: DeleteUser) {
  function* fn() {
    const { router } = action;

    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/delete`,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'User account deleted.') {
      // log them out here (clear localStorage and sessionStorage)
      yield call([router, router.push], '/home');
    }
  }

  yield* workerHelper(fn);
}
