import { all, takeEvery } from 'redux-saga/effects';

import { actionTypes as authActionTypes } from '../auth/types';
import {
  messengerConnectSaga,
  messengerDisconnectSaga,
  messengerChangeChannelSaga,
  messengerSendMessageSaga,
  messengerSendWhisperSaga
} from '../messenger/sagas';
import { actionTypes as messengerActionTypes } from '../messenger/types';

const { AUTH_USER_LOGOUT } = authActionTypes;
const {
  MESSENGER_CONNECT,
  MESSENGER_DISCONNECT,
  MESSENGER_CHANGE_CHANNEL,
  MESSENGER_SEND_MESSAGE,
  MESSENGER_SEND_WHISPER,
} = messengerActionTypes

export function* watchMessenger() {
  yield all([
    takeEvery(MESSENGER_CONNECT, messengerConnectSaga),

    takeEvery(MESSENGER_DISCONNECT, messengerDisconnectSaga),
    takeEvery(AUTH_USER_LOGOUT, messengerDisconnectSaga),

    takeEvery(MESSENGER_CHANGE_CHANNEL, messengerChangeChannelSaga),

    takeEvery(MESSENGER_SEND_MESSAGE, messengerSendMessageSaga),

    takeEvery(MESSENGER_SEND_WHISPER, messengerSendWhisperSaga)
  ]);
}