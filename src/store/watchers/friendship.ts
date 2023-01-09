import { all, takeEvery } from 'redux-saga/effects';

import {
  requestFriendshipSaga, acceptFriendshipSaga, rejectFriendshipSaga, deleteFriendshipSaga,
  blockUserSaga, unblockUserSaga
} from '../user/friendship/sagas';
import { actionTypes } from '../user/friendship/types';

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