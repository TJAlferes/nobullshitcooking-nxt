import { all, takeEvery } from 'redux-saga/effects';

import { actionTypes as authActionTypes } from '../auth/types';
import {
  chatConnectSaga,
  chatDisconnectSaga,
  chatJoinRoomSaga,
  chatSendMessageSaga,
  chatSendPrivateMessageSaga
} from '../chat/sagas';
import { actionTypes as chatActionTypes } from '../chat/types';

const { AUTH_USER_LOGOUT } = authActionTypes;
const {
  CHAT_CONNECT,
  CHAT_DISCONNECT,
  CHAT_JOIN_ROOM,
  CHAT_SEND_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE
} = chatActionTypes

export function* watchChat() {
  yield all([
    takeEvery(CHAT_CONNECT, chatConnectSaga),
    takeEvery(CHAT_DISCONNECT, chatDisconnectSaga),
    takeEvery(AUTH_USER_LOGOUT, chatDisconnectSaga),  // move to auth watcher?
    takeEvery(CHAT_JOIN_ROOM, chatJoinRoomSaga),
    takeEvery(CHAT_SEND_MESSAGE, chatSendMessageSaga),
    takeEvery(CHAT_SEND_PRIVATE_MESSAGE, chatSendPrivateMessageSaga)
  ]);
}