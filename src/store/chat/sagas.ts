import type { Store }     from 'redux';
import { all, takeEvery } from 'redux-saga/effects';
import { io }             from 'socket.io-client';
import type { Socket }    from 'socket.io-client';

import { endpoint } from '../../utils/api';
import { actionTypes as authActionTypes } from '../auth/types';
import {
  connected,
  disconnected,
  onlineFriends,
  friendCameOnline,
  friendWentOffline,
  joinedRoom,
  rejoinedRoom,
  userJoinedRoom,
  userLeftRoom,
  receivedMessage,
  receivedPrivateMessage,
  failedPrivateMessage
} from './actions';
import { actionTypes as chatActionTypes, IMessage, IJoinRoom, ISendMessage, ISendPrivateMessage } from './types';

const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(`${endpoint}`, {autoConnect: false, withCredentials: true});

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;
  const { dispatch } = store;

  socket.on('connect', () => {
    dispatch(connected());
    socket.emit('GetOnlineFriends');
  });
  socket.on('disconnect', () => dispatch(disconnected()));
  socket.io.on('reconnect', () => {
    const room = store.getState().chat.room;
    if (room === "") return;  // ?
    socket.emit('RejoinRoom', room);
  });

  socket.on('OnlineFriends',        (friends) => dispatch(onlineFriends(friends)));
  socket.on('FriendCameOnline',     (friend) =>  dispatch(friendCameOnline(friend)));
  socket.on('FriendWentOffline',    (friend) =>  dispatch(friendWentOffline(friend)));

  socket.on('UsersInRoom',          (users, room) => dispatch(joinedRoom(users, room)));
  socket.on('UsersInRoomRefetched', (users, room) => dispatch(rejoinedRoom(users, room)));

  socket.on('UserJoinedRoom',       (user) => dispatch(userJoinedRoom(user)));
  socket.on('UserLeftRoom',         (user) => dispatch(userLeftRoom(user)));

  socket.on('Message',              (message) =>  dispatch(receivedMessage(message)));
  socket.on('PrivateMessage',       (message) =>  dispatch(receivedPrivateMessage(message)));
  socket.on('FailedPrivateMessage', (feedback) => dispatch(failedPrivateMessage(feedback)));

  console.log("chatInit called and ran");
}

// Sagas

// call([socket, socket.method(), ...args])? channels?

export function* connectSaga() {
  socket.connect();
}

export function* disconnectSaga() {
  socket.disconnect();
}

export function* joinRoomSaga({ room }: IJoinRoom) {
  socket.emit('JoinRoom', room);
}

export function* sendMessageSaga({ text }: ISendMessage) {
  socket.emit('SendMessage', text);
}

export function* sendPrivateMessageSaga({ text, to }: ISendPrivateMessage) {
  socket.emit('SendPrivateMessage', text, to);
}

export function* updateOnlineSaga(status: string) {  // TO DO: give this an action?
  if (status === "connected") socket.emit('GetOnlineFriends');
  //TO DO: if (status === "disconnected") socket.emit('AppearOfflineTo');  // or in separate function?
}

interface IClientToServerEvents {
  GetOnlineFriends():                           void;
  GetUsersInRoom(room: string):                 void;
  JoinRoom(room: string):                       void;
  RejoinRoom(room: string):                     void;
  SendMessage(text: string):                    void;
  SendPrivateMessage(text: string, to: string): void;
  //disconnecting
}

// TO DO: question everything: do you need a saga? do you need the event/state in redux? do you need the event/state at all?
interface IServerToClientEvents {
  OnlineFriends(friends: string[]):                    void;
  FriendCameOnline(friend: string):                    void;
  FriendWentOffline(friend: string):                   void;
  UsersInRoom(users: string[], room: string):          void;
  UsersInRoomRefetched(users: string[], room: string): void;
  UserJoinedRoom(user: string):                        void;
  UserLeftRoom(user: string):                          void;
  Message(message: IMessage):                          void;
  PrivateMessage(message: IMessage):                   void;
  FailedPrivateMessage(feedback: string):              void;
}

const { USER_LOGOUT } = authActionTypes;
const { CONNECT, DISCONNECT, JOIN_ROOM, SEND_MESSAGE, SEND_PRIVATE_MESSAGE } = chatActionTypes

// takeLatest?
export function* watchChat() {
  yield all([
    takeEvery(CONNECT,              connectSaga),
    takeEvery(DISCONNECT,           disconnectSaga),
    takeEvery(USER_LOGOUT,          disconnectSaga),

    takeEvery(JOIN_ROOM,            joinRoomSaga),

    takeEvery(SEND_MESSAGE,         sendMessageSaga),
    takeEvery(SEND_PRIVATE_MESSAGE, sendPrivateMessageSaga)
  ]);
}
