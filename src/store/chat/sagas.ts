import { Store } from 'redux';
import { io, Socket } from 'socket.io-client';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
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
import { IMessage, IJoinRoom, ISendMessage, ISendPrivateMessage } from './types';

const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(`${endpoint}`, {autoConnect: false, reconnection: true});  //withCredentials: true

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;

  // Users

  socket.on('OnlineFriends', (friends) => {
    if (!friends) return;
    store.dispatch(onlineFriends(friends));
  });

  socket.on('FriendCameOnline', (friend) => {
    if (!friend) return;
    store.dispatch(friendCameOnline(friend));
  });

  socket.on('FriendWentOffline', (friend) => {
    if (!friend) return;
    store.dispatch(friendWentOffline(friend));
  });

  // Messages

  socket.on('Message', (message) => {
    if (!message) return;
    store.dispatch(receivedMessage(message));
  });

  socket.on('PrivateMessage', (message) => {
    if (!message) return;
    store.dispatch(receivedPrivateMessage(message));
  });

  socket.on('FailedPrivateMessage', (feedback) => {
    if (!feedback) return;
    store.dispatch(failedPrivateMessage(feedback));
  });

  // Rooms

  socket.on('UsersInRoom', (users, room) => {
    if (!users || !room) return;
    store.dispatch(joinedRoom(users, room));
  });

  socket.on('UsersInRoomRefetched', (users, room) => {
    if (!users || !room) return;
    store.dispatch(rejoinedRoom(users, room));
  });

  socket.on('UserJoinedRoom', (user) => {
    if (!user) return;
    store.dispatch(userJoinedRoom(user));
  });

  socket.on('UserLeftRoom', (user) => {
    if (!user) return;
    store.dispatch(userLeftRoom(user));
  });

  // SocketIO Events

  socket.on('connect', () => {
    store.dispatch(connected());
    socket.emit('GetOnlineFriends');
  });

  socket.on('disconnect', () => {
    store.dispatch(disconnected());
  });

  socket.on('reconnect', () => {
    const { chat: { room } } = store.getState();
    if (room === "") return;  // ?
    socket.emit('RejoinRoom', room);
  });
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

// TO DO: more consistent, shorter names
interface IServerToClientEvents {
  // Users
  OnlineFriends(friends: string[]): void;
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