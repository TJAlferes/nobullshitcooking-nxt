import { all, takeEvery } from 'redux-saga/effects';

import { actionTypes as authActionTypes } from '../auth/types';
import { connectSaga, disconnectSaga, joinRoomSaga, sendMessageSaga, sendPrivateMessageSaga } from '../chat/sagas';
import { actionTypes as chatActionTypes } from '../chat/types';

const { AUTH_USER_LOGOUT } = authActionTypes;
const { CONNECT, DISCONNECT, JOIN_ROOM, SEND_MESSAGE, SEND_PRIVATE_MESSAGE } = chatActionTypes

// takeLatest?
export function* watchChat() {
  yield all([
    takeEvery(CONNECT,              connectSaga),
    takeEvery(DISCONNECT,           disconnectSaga),
    takeEvery(AUTH_USER_LOGOUT,     disconnectSaga),

    takeEvery(JOIN_ROOM,            joinRoomSaga),

    takeEvery(SEND_MESSAGE,         sendMessageSaga),
    takeEvery(SEND_PRIVATE_MESSAGE, sendPrivateMessageSaga)
  ]);
}

/*
export function* watcherSaga() {
  yield all([
    takeEvery(ACTION_TYPE, workerSaga);
    takeEvery(ACTION_TYPE, workerSaga);
  ]);
}
*/