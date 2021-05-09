import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
//import { chatUpdateOnlineSaga } from '../../chat/sagas';
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

export function* userRequestFriendshipSaga(action: IUserRequestFriendship) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/create`,
      {friendName: action.friendName},
      {withCredentials: true}
    );
    
    yield put(userMessage(message));

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userAcceptFriendshipSaga(action: IUserAcceptFriendship) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/accept`,
      {friendName: action.friendName},
      {withCredentials: true}
    );
    
    yield put(userMessage(message));

    yield call(dataGetMyFriendshipsSaga);
    //yield call(chatUpdateOnlineSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userRejectFriendshipSaga(action: IUserRejectFriendship) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/reject`,
      {friendName: action.friendName},
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

export function* userDeleteFriendshipSaga(action: IUserDeleteFriendship) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/delete`,
      {withCredentials: true, data: {friendName: action.friendName}}
    );
    
    yield put(userMessage(message));

    yield call(dataGetMyFriendshipsSaga);
    //yield call(chatUpdateOnlineSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userBlockUserSaga(action: IUserBlockUser) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/block`,
      {friendName: action.friendName},
      {withCredentials: true}
    );
    
    yield put(userMessage(message));

    yield call(dataGetMyFriendshipsSaga);
    //yield call(chatUpdateOnlineSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userUnblockUserSaga(action: IUserUnblockUser) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/unblock`,
      {withCredentials: true, data: {friendName: action.friendName}}
    );
    
    yield put(userMessage(message));

    yield call(dataGetMyFriendshipsSaga);
    //yield call(chatUpdateOnlineSaga);  // needed in this one?

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}