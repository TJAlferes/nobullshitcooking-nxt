import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { actionTypes, SubmitAvatar }         from './state';

const { SUBMIT_AVATAR } = actionTypes;

export function* watchAvatar() {
  yield all([takeEvery(SUBMIT_AVATAR, submitAvatarSaga)]);
}

export function* submitAvatarSaga({ full_avatar, tiny_avatar }: SubmitAvatar) {
  try {
    let avatarUrl;

    if (full_avatar && tiny_avatar) {
      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subBucket: 'avatar'},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        full_avatar,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tiny_avatar,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      avatarUrl = fullName;
    }
    else avatarUrl = "nobsc-user-default";

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/set-avatar`,
      {avatar: avatarUrl},
      {withCredentials: true}
    );

    yield put(systemMessage(message));

    if (message === 'Avatar set.') {
      yield delay(2000);
      yield put(systemMessageClear());
      yield call(() => location.reload());  // ?  // refresh/update respective list
    }
  } catch (err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
