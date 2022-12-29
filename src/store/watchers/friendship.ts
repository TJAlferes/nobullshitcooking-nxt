import { all, takeEvery } from 'redux-saga/effects';

import {
  userRequestFriendshipSaga, userAcceptFriendshipSaga, userRejectFriendshipSaga, userDeleteFriendshipSaga,
  userBlockUserSaga, userUnblockUserSaga
} from '../user/friendship/sagas';
import { actionTypes } from '../user/friendship/types';

const {
  USER_REQUEST_FRIENDSHIP, USER_ACCEPT_FRIENDSHIP, USER_REJECT_FRIENDSHIP, USER_DELETE_FRIENDSHIP,
  USER_BLOCK_USER, USER_UNBLOCK_USER
} = actionTypes;

export function* watchFriendship() {
  yield all([
    takeEvery(USER_REQUEST_FRIENDSHIP, userRequestFriendshipSaga),
    takeEvery(USER_ACCEPT_FRIENDSHIP,  userAcceptFriendshipSaga),
    takeEvery(USER_REJECT_FRIENDSHIP,  userRejectFriendshipSaga),
    takeEvery(USER_DELETE_FRIENDSHIP,  userDeleteFriendshipSaga),

    takeEvery(USER_BLOCK_USER,         userBlockUserSaga),
    takeEvery(USER_UNBLOCK_USER,       userUnblockUserSaga)
  ]);
}