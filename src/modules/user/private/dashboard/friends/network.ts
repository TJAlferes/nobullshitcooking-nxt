import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../../config/api';
//import { updateOnlineWorker }                from '../../../../chat/network';
import { systemMessage, systemMessageClear } from '../../../../shared/system/state';
import { getMyFriendshipsWorker }            from '../../data/network';
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

export function* friendshipWatcher() {
  yield all([
    takeEvery(REQUEST_FRIENDSHIP, requestFriendshipWorker),
    takeEvery(ACCEPT_FRIENDSHIP,  acceptFriendshipWorker),
    takeEvery(REJECT_FRIENDSHIP,  rejectFriendshipWorker),
    takeEvery(DELETE_FRIENDSHIP,  deleteFriendshipWorker),
    takeEvery(BLOCK_USER,         blockUserWorker),
    takeEvery(UNBLOCK_USER,       unblockUserWorker)
  ]);
}

const error = 'An error occurred. Please try again.';

export function* requestFriendshipWorker({ friend }: RequestFriendship) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/create`,
      {friend},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* acceptFriendshipWorker({ friend }: AcceptFriendship) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/accept`,
      {friend},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyFriendshipsWorker);  // yield put(getMyFriendships());
    //yield call(() => updateOnlineWorker("connected"));  // chat ??? why make them go online?
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* rejectFriendshipWorker({ friend }: RejectFriendship) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/friendship/reject`,
      {friend},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyFriendshipsWorker);
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deleteFriendshipWorker({ friend }: DeleteFriendship) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/delete`,
      {
        withCredentials: true,
        data: {friend}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyFriendshipsWorker);
    //yield call(() => updateOnlineWorker("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* blockUserWorker({ friend }: BlockUser) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship/block`,
      {friend},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyFriendshipsWorker);
    //yield call(() => updateOnlineWorker("disconnected"));  // chat ??? don't make them actually go offline
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unblockUserWorker({ friend }: UnblockUser) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/unblock`,
      {
        withCredentials: true,
        data: {friend}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyFriendshipsWorker);
  } catch(err) {
    yield put(systemMessage(error));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
