import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../config/api';
import { updateOnlineSaga }                  from '../../chat/network';
import { getMyFriendshipsSaga }              from '../../data/network';  // move to shared/data/network ?
import { systemMessage, systemMessageClear } from '../../shared/system-message/state';
import { actionTypes } from './state';
import type {
  RequestFriendship,
  AcceptFriendship,
  RejectFriendship,
  DeleteFriendship,
  BlockUser,
  UnblockUser
} from './state';

const {
  REQUEST_FRIENDSHIP,
  ACCEPT_FRIENDSHIP,
  REJECT_FRIENDSHIP,
  DELETE_FRIENDSHIP,
  BLOCK_USER,
  UNBLOCK_USER
} = actionTypes;

export function* watchFriendship() {
  yield all([
    takeEvery(REQUEST_FRIENDSHIP, requestFriendshipSaga),
    takeEvery(ACCEPT_FRIENDSHIP,  acceptFriendshipSaga),
    takeEvery(REJECT_FRIENDSHIP,  rejectFriendshipSaga),
    takeEvery(DELETE_FRIENDSHIP,  deleteFriendshipSaga),
    takeEvery(BLOCK_USER,         blockUserSaga),
    takeEvery(UNBLOCK_USER,       unblockUserSaga)
  ]);
}

const error = 'An error occurred. Please try again.';

export function* requestFriendshipSaga({ friend }: RequestFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/friendship/create`, {friend}, {withCredentials: true});

    yield put(systemMessage(message));
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* acceptFriendshipSaga({ friend }: AcceptFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.put], `${endpoint}/user/friendship/accept`, {friend}, {withCredentials: true});

    yield put(systemMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("connected"));  // chat ??? why make them go online?
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* rejectFriendshipSaga({ friend }: RejectFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.put], `${endpoint}/user/friendship/reject`, {friend}, {withCredentials: true});

    yield put(systemMessage(message));
    yield call(getMyFriendshipsSaga);
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deleteFriendshipSaga({ friend }: DeleteFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/friendship/delete`, {withCredentials: true, data: {friend}});

    yield put(systemMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* blockUserSaga({ friend }: BlockUser) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/block`,
      {friend},
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyFriendshipsSaga);
    yield call(() => updateOnlineSaga("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unblockUserSaga({ friend }: UnblockUser) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/unblock`,
      {
        withCredentials: true,
        data: {friend}
      }
    );

    yield put(systemMessage(message));
    yield call(getMyFriendshipsSaga);
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
