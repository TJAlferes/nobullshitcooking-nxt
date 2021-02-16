import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { userMessage, userMessageClear } from '../actions';
import { IUserSubmitAvatar } from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function* userSubmitAvatarSaga(action: IUserSubmitAvatar) {
  try {

    let avatarUrl;

    if (action.fullAvatar && action.tinyAvatar) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/avatar`,
        {fileType: action.fullAvatar.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        action.fullAvatar,
        {headers: {'Content-Type': action.fullAvatar.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        action.tinyAvatar,
        {headers: {'Content-Type': action.tinyAvatar.type}}
      );

      avatarUrl = res1.data.fullName;

    } else {

      avatarUrl = "nobsc-user-default";

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/set-avatar`,
      {avatar: avatarUrl},
      {withCredentials: true}
    );

    yield put(userMessage(message));

    if (message === 'Avatar set.') {
      // refresh/update respective list
      yield delay(2000);
      yield put(userMessageClear());
      yield call(() => location.reload());  // ?
    }
    
  } catch (err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}