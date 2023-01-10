import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { updateOnlineSaga } from '../../chat/sagas';
import { getMyFriendshipsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import { IRequestFriendship, IAcceptFriendship, IRejectFriendship, IDeleteFriendship, IBlockUser, IUnblockUser } from './types';

const error = 'An error occurred. Please try again.';

export function* requestFriendshipSaga({ friend }: IRequestFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/friendship/create`, {friend}, {withCredentials: true});

    yield put(userMessage(message));
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* acceptFriendshipSaga({ friend }: IAcceptFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.put], `${endpoint}/user/friendship/accept`, {friend}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("connected"));  // chat ??? why make them go online?
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* rejectFriendshipSaga({ friend }: IRejectFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.put], `${endpoint}/user/friendship/reject`, {friend}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyFriendshipsSaga);
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deleteFriendshipSaga({ friend }: IDeleteFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/friendship/delete`, {withCredentials: true, data: {friend}});

    yield put(userMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* blockUserSaga({ friend }: IBlockUser) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/friendship/block`, {friend}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* unblockUserSaga({ friend }: IUnblockUser) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/friendship/unblock`, {withCredentials: true, data: {friend}});

    yield put(userMessage(message));
    yield call(getMyFriendshipsSaga);
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}