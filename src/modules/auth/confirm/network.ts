import axios from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                            from '../../../config/api';
import { systemMessage, systemMessageClear }   from '../../shared/system/state';
import { actionTypes, Confirm, RequestResend } from './state';

const { CONFIRM, REQUEST_RESEND } = actionTypes;

export function* userConfirmationWatcher() {
  yield all([
    takeEvery(CONFIRM,        userConfirmWorker),
    takeEvery(REQUEST_RESEND, userRequestResendWorker)
  ]);
}

export function* userConfirmWorker(action: Confirm) {
  try {
    const { confirmation_code, router } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/confirmation/confirm`,
      {confirmation_code}
    );
    
    yield put(systemMessage(data.message));

    if (data.message === "User account confirmed.") {
      yield call([router, router.push], '/login');
    }
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* userRequestResendWorker(action: RequestResend) {
  try {
    const { email, password } = action;

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/confirmation/resend-confirmation-code`,
      {email, password}
    );

    yield put(systemMessage(data.message));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
