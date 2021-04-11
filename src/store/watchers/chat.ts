import { all, takeEvery } from 'redux-saga/effects';

import { actionTypes as authActionTypes } from '../auth/types';
import {
  chatConnectSaga,
  chatDisconnectSaga,
  chatChangeRoomSaga,
  chatSendPublicMessageSaga,
  chatSendPrivateMessageSaga
} from '../chat/sagas';
import { actionTypes as chatActionTypes } from '../chat/types';

const { AUTH_USER_LOGOUT } = authActionTypes;
const {
  CHAT_CONNECT,
  CHAT_DISCONNECT,
  CHAT_CHANGE_ROOM,
  CHAT_SEND_PUBLIC_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE,
} = chatActionTypes

export function* watchChat() {
  yield all([
    takeEvery(CHAT_CONNECT, chatConnectSaga),

    takeEvery(CHAT_DISCONNECT, chatDisconnectSaga),
    takeEvery(AUTH_USER_LOGOUT, chatDisconnectSaga),  // move to auth watcher?

    takeEvery(CHAT_CHANGE_ROOM, chatChangeRoomSaga),

    takeEvery(CHAT_SEND_PUBLIC_MESSAGE, chatSendPublicMessageSaga),

    takeEvery(CHAT_SEND_PRIVATE_MESSAGE, chatSendPrivateMessageSaga)
  ]);
}