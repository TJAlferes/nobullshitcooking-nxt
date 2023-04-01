import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../utils/api';
import { userMessage, userMessageClear } from '../actions';
import { actionTypes, SubmitAvatar }     from './types';

const { SUBMIT_AVATAR } = actionTypes;

export function* watchAvatar() {
  yield all([takeEvery(SUBMIT_AVATAR, submitAvatarSaga)]);
}

export function* submitAvatarSaga(action: SubmitAvatar) {
  try {
    let avatarUrl;

    if (action.fullAvatar && action.tinyAvatar) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'avatar'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, action.fullAvatar, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature, action.tinyAvatar, {headers: {'Content-Type': 'image/jpeg'}});

      avatarUrl = fullName;
    }
    else avatarUrl = "nobsc-user-default";

    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/set-avatar`, {avatar: avatarUrl}, {withCredentials: true});

    yield put(userMessage(message));

    if (message === 'Avatar set.') {
      yield delay(2000);
      yield put(userMessageClear());
      yield call(() => location.reload());  // ?  // refresh/update respective list
    }
  } catch (err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}
