import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../../shared/system/state';
import { actionTypes, SubmitAvatar }         from './state';

const { SUBMIT_AVATAR } = actionTypes;

export function* settingsWatcher() {
  yield all([
    takeEvery(SUBMIT_AVATAR, submitAvatarWorker)
  ]);
}

export function* submitAvatarWorker({ full_avatar, tiny_avatar }: SubmitAvatar) {
  try {
    let avatarUrl;

    if (full_avatar && tiny_avatar) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'public/avatar/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, full_avatar);
      yield call(uploadImageToAWSS3, tinySignature, tiny_avatar);

      avatarUrl = filename;
    }
    else avatarUrl = "nobsc-user-default";

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/set-avatar`,
      {avatar: avatarUrl},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));

    if (data.message === 'Avatar set.') {
      yield delay(2000);
      yield put(systemMessageClear());
      yield call([location, location.reload]);  // ?  // refresh/update respective list
    }
  } catch (err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
