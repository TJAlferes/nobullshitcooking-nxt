import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { chatUpdateOnlineSaga } from '../../chat/sagas';
import { dataGetMyFriendshipsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserRequestFriendship,
  IUserAcceptFriendship,
  IUserRejectFriendship,
  IUserDeleteFriendship,
  IUserBlockUser,
  IUserUnblockUser
} from './types';

export function* userRequestFriendshipSaga({ friend }: IUserRequestFriendship) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/create`,
      {friend},
      {withCredentials: true}
    );
    yield put(userMessage(message));
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userAcceptFriendshipSaga(
  { friend, status }: IUserAcceptFriendship
) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/accept`,
      {friend},
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFriendshipsSaga);
    yield call(() => chatUpdateOnlineSaga(status));
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userRejectFriendshipSaga({ friend }: IUserRejectFriendship) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/reject`,
      {friend},
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFriendshipsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeleteFriendshipSaga(
  { friend, status }: IUserDeleteFriendship
) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/delete`,
      {withCredentials: true, data: {friend}}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFriendshipsSaga);
    yield call(() => chatUpdateOnlineSaga(status));
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userBlockUserSaga({ friend, status }: IUserBlockUser) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/block`,
      {friend},
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFriendshipsSaga);
    yield call(() => chatUpdateOnlineSaga(status));
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userUnblockUserSaga({ friend }: IUserUnblockUser) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/unblock`,
      {withCredentials: true, data: {friend}}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFriendshipsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}