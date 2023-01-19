import type { Store } from 'redux';
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
import type { IMessage, IJoinRoom, ISendMessage, ISendPrivateMessage } from './types';

const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(`${endpoint}`, {autoConnect: false});  //withCredentials: true

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;

  socket.on('connect', () => {
    store.dispatch(connected());
    socket.emit('GetOnlineFriends');
  });

  socket.on('disconnect', () => store.dispatch(disconnected()));

  socket.on('reconnect', () => {
    const room = store.getState().chat.room;
    if (room === "") return;                  // ?
    socket.emit('RejoinRoom', room);
  });

  socket.on('OnlineFriends',        (friends) => friends && store.dispatch(onlineFriends(friends)));
  socket.on('FriendCameOnline',     (friend) => friend && store.dispatch(friendCameOnline(friend)));
  socket.on('FriendWentOffline',    (friend) => friend && store.dispatch(friendWentOffline(friend)));

  socket.on('Message',              (message) => message && store.dispatch(receivedMessage(message)));
  socket.on('PrivateMessage',       (message) => message && store.dispatch(receivedPrivateMessage(message)));
  socket.on('FailedPrivateMessage', (feedback) => feedback && store.dispatch(failedPrivateMessage(feedback)));

  socket.on('UsersInRoom',          (users, room) => (users && room) && store.dispatch(joinedRoom(users, room)));
  socket.on('UsersInRoomRefetched', (users, room) => (users && room) && store.dispatch(rejoinedRoom(users, room)));  // source of bug?

  socket.on('UserJoinedRoom',       (user) => user && store.dispatch(userJoinedRoom(user)));
  socket.on('UserLeftRoom',         (user) => user && store.dispatch(userLeftRoom(user)));
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
  // Users
  GetOnlineFriends():                           void;
  GetUsersInRoom(room: string):                 void;
  // Messages
  SendMessage(text: string):                    void;
  SendPrivateMessage(text: string, to: string): void;
  // Rooms
  JoinRoom(room: string):                       void;
  RejoinRoom(room: string):                     void;
  //disconnecting
}

// TO DO: question everything: do you need a saga? do you need the event/state in redux? do you need the event/state at all?
interface IServerToClientEvents {
  // Users
  OnlineFriends(friends: string[]):                    void;
  FriendCameOnline(friend: string):                    void;
  FriendWentOffline(friend: string):                   void;
  // Messages
  Message(message: IMessage):                          void;
  PrivateMessage(message: IMessage):                   void;
  FailedPrivateMessage(feedback: string):              void;
  // Rooms
  UsersInRoom(users: string[], room: string):          void;
  UsersInRoomRefetched(users: string[], room: string): void;
  UserJoinedRoom(user: string):                        void;
  UserLeftRoom(user: string):                          void;
}