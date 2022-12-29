import { Store } from 'redux';
import { io, Socket } from 'socket.io-client';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import {
  chatConnected, chatDisconnected,
  chatOnlineFriends, chatFriendCameOnline, chatFriendWentOffline,
  chatJoinedRoom, chatRejoinedRoom, chatUserJoinedRoom, chatUserLeftRoom,
  chatReceivedMessage, chatReceivedPrivateMessage, chatFailedPrivateMessage
} from './actions';
import { IMessage, IChatJoinRoom, IChatSendMessage, IChatSendPrivateMessage } from './types';

const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(`${endpoint}`, {autoConnect: false, reconnection: true});  //withCredentials: true

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;

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

  socket.on('Message', (message) => {
    if (!message) return;
    store.dispatch(chatReceivedMessage(message));
  });

  socket.on('PrivateMessage', (message) => {
    if (!message) return;
    store.dispatch(chatReceivedPrivateMessage(message));
  });

  socket.on('FailedPrivateMessage', (feedback) => {
    if (!feedback) return;
    store.dispatch(chatFailedPrivateMessage(feedback));
  });

  // Rooms

  socket.on('UsersInRoom', (users, room) => {
    if (!users || !room) return;
    store.dispatch(chatJoinedRoom(users, room));
  });

  socket.on('UsersInRoomRefetched', (users, room) => {
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
    const { chat: { room } } = store.getState();
    if (room === "") return;  // ?
    socket.emit('RejoinRoom', room);
  });
}

// Sagas

// call([socket, socket.method(), ...args])? channels?

export function* chatConnectSaga() {
  socket.connect();
}

export function* chatDisconnectSaga() {
  socket.disconnect();
}

export function* chatJoinRoomSaga({ room }: IChatJoinRoom) {
  socket.emit('JoinRoom', room);
}

export function* chatSendMessageSaga({ text }: IChatSendMessage) {
  socket.emit('SendMessage', text);
}

export function* chatSendPrivateMessageSaga({ text, to }: IChatSendPrivateMessage) {
  socket.emit('SendPrivateMessage', text, to);
}

export function* chatUpdateOnlineSaga(status: string) {  // TO DO: give this an action?
  if (status === "connected") socket.emit('GetOnlineFriends');
}

interface IClientToServerEvents {
  // Users
  GetOnlineFriends(): void;
  GetUsersInRoom(room: string): void;
  // Messages
  SendMessage(text: string): void;
  SendPrivateMessage(text: string, to: string): void;
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
  Message(message: IMessage): void;
  PrivateMessage(message: IMessage): void;
  FailedPrivateMessage(feedback: string): void;
  // Rooms
  UsersInRoom(users: string[], room: string): void;
  UsersInRoomRefetched(users: string[], room: string): void;
  UserJoinedRoom(user: string): void;
  UserLeftRoom(user: string): void;
}