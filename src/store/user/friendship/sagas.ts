import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../utils/api';
import { updateOnlineSaga }              from '../../chat/sagas';
import { getMyFriendshipsSaga }          from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import { actionTypes, RequestFriendship, AcceptFriendship, RejectFriendship, DeleteFriendship, BlockUser, UnblockUser } from './types';

const {
  REQUEST_FRIENDSHIP, ACCEPT_FRIENDSHIP, REJECT_FRIENDSHIP, DELETE_FRIENDSHIP,
  BLOCK_USER, UNBLOCK_USER
} = actionTypes;

export function* watchFriendship() {
  yield all([
    takeEvery(REQUEST_FRIENDSHIP, requestFriendshipSaga),
    takeEvery(ACCEPT_FRIENDSHIP,  acceptFriendshipSaga),
    takeEvery(REJECT_FRIENDSHIP,  rejectFriendshipSaga),
    takeEvery(DELETE_FRIENDSHIP,  deleteFriendshipSaga),

    takeEvery(BLOCK_USER,   blockUserSaga),
    takeEvery(UNBLOCK_USER, unblockUserSaga)
  ]);
}

const error = 'An error occurred. Please try again.';

export function* requestFriendshipSaga({ friend }: RequestFriendship) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/friendship/create`, {friend}, {withCredentials: true});

    yield put(userMessage(message));
  } catch(err) {
    yield put(userMessage(error));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* acceptFriendshipSaga({ friend }: AcceptFriendship) {
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

export function* rejectFriendshipSaga({ friend }: RejectFriendship) {
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

export function* deleteFriendshipSaga({ friend }: DeleteFriendship) {
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

export function* blockUserSaga({ friend }: BlockUser) {
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

export function* unblockUserSaga({ friend }: UnblockUser) {
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
