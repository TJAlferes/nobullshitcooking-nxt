import { Store } from 'redux';
import { io, Socket } from 'socket.io-client';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import {
  chatConnected,
  chatDisconnected,
  chatOnlineFriends,
  chatFriendCameOnline,
  chatFriendWentOffline,
  chatJoinedRoom,
  chatRejoinedRoom,
  chatUserJoinedRoom,
  chatUserLeftRoom,
  chatReceivedMessage,
  chatReceivedPrivateMessage,
  chatFailedPrivateMessage
} from './actions';
import {
  IMessage,
  IChatChangeRoom,
  IChatSendMessage,
  IChatSendPrivateMessage
} from './types';

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;

  const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(
    `${endpoint}`,
    {autoConnect: false, reconnection: true, /*withCredentials: true*/}
  );

  // Users

  socket.on('OnlineFriends', (onlineFriends) => {
    if (!onlineFriends) return;
    store.dispatch(chatOnlineFriends(onlineFriends));
  });

  socket.on('FriendCameOnline', (friend) => {
    if (!friend) return;
    store.dispatch(chatFriendCameOnline(friend));
  });

  socket.on('FriendWentOffline', (friend) => {
    if (!friend) return;
    store.dispatch(chatFriendWentOffline(friend));
  });

  // Messages

  socket.on('ReceivedMessage', (message) => {
    if (!message) return;
    store.dispatch(chatReceivedMessage(message));
  });

  socket.on('ReceivedPrivateMessage', (message) => {
    if (!message) return;
    store.dispatch(chatReceivedPrivateMessage(message));
  });

  socket.on('FailedPrivateMessage', (feedback) => {
    if (!feedback) return;
    store.dispatch(chatFailedPrivateMessage(feedback));
  });

  // Rooms

  socket.on('JoinedRoom', (users, room) => {
    if (!users || !room) return;
    store.dispatch(chatJoinedRoom(users, room));
  });

  socket.on('RejoinedRoom', (users, room) => {
    if (!users || !room) return;
    store.dispatch(chatRejoinedRoom(users, room));
  });

  socket.on('UserJoinedRoom', (user) => {
    if (!user) return;
    store.dispatch(chatUserJoinedRoom(user));
  });

  socket.on('UserLeftRoom', (user) => {
    if (!user) return;
    store.dispatch(chatUserLeftRoom(user));
  });

  // SocketIO Events

  socket.on('connect', () => {
    store.dispatch(chatConnected());
    socket.emit('GetOnlineFriends');
  });

  socket.on('disconnect', () => {
    store.dispatch(chatDisconnected());
  });

  socket.on('reconnect', () => {
    chatRejoinRoomSaga();
  });
}

// Sagas

// use call([socket, socket.method(), ...args])
// these don't even need to be sagas
// channels?

export function* chatConnectSaga() {
  socket.connect();
}

export function* chatDisconnectSaga() {
  socket.disconnect();
}

export function* chatChangeRoomSaga(action: IChatChangeRoom) {
  socket.emit('AddRoom', action.room);
}

export function* chatSendPublicMessageSaga(action: IChatSendPublicMessage) {
  socket.emit('AddMessage', action.text);
}

export function* chatSendPrivateMessageSaga(action: IChatSendPrivateMessage) {
  socket.emit('AddWhisper', action.text, action.to);
}

// pass store in from actions?
export function* chatUpdateOnlineSaga() {
  const { chat } = store.getState();
  if (chat.status === "Connected") socket.emit('GetOnlineFriends');
}

export function chatRejoinRoomSaga() {
  const { chat } = store.getState();
  if (chat.channel === "") return;
  socket.emit('RejoinRoom', chat.channel);
}

interface IClientToServerEvents {
  // Users
  GetOnlineFriends(): void;
  GetUsersInRoom(room: string): void;
  // Messages
  Message(text: string): void;
  PrivateMessage(text: string, to: string): void;
  // Rooms
  JoinRoom(room: string): void;
  RejoinRoom(room: string): void;
  //disconnecting
}

interface IServerToClientEvents {
  // Users
  OnlineFriends(onlineFriends: string[]): void;
  FriendCameOnline(friend: string): void;
  FriendWentOffline(friend: string): void;
  // Messages
  ReceivedMessage(message: IMessage): void;
  ReceivedPrivateMessage(message: IMessage): void;
  FailedPrivateMessage(feedback: string): void;
  // Rooms
  UsersInRoom(users: string[], room: string): void;
  UsersInRoomRefetched(users: string[], room: string): void;
  UserJoinedRoom(user: string): void;
  UserLeftRoom(user: string): void;
}