import { IAuthUserLogout } from '../auth/types';

export const actionTypes = {
  CONNECT:      'CONNECT',
  CONNECTED:    'CONNECTED',
  DISCONNECT:   'DISCONNECT',
  DISCONNECTED: 'DISCONNECTED',

  ONLINE_FRIENDS:      'ONLINE_FRIENDS',
  FRIEND_CAME_ONLINE:  'FRIEND_CAME_ONLINE',
  FRIEND_WENT_OFFLINE: 'FRIEND_WENT_OFFLINE',

  JOIN_ROOM:     'JOIN_ROOM',
  JOINED_ROOM:   'JOINED_ROOM',
  REJOINED_ROOM: 'REJOINED_ROOM',

  USER_JOINED_ROOM: 'USER_JOINED_ROOM',
  USER_LEFT_ROOM:   'USER_LEFT_ROOM',

  SEND_MESSAGE:             'SEND_MESSAGE',
  RECEIVED_MESSAGE:         'RECEIVED_MESSAGE',

  SEND_PRIVATE_MESSAGE:     'SEND_PRIVATE_MESSAGE',
  RECEIVED_PRIVATE_MESSAGE: 'RECEIVED_PRIVATE_MESSAGE',
  FAILED_PRIVATE_MESSAGE:   'FAILED_PRIVATE_MESSAGE'
} as const;

/*

State

*/

// TO DO: double-check times

export interface IChatState {
  status:   string;
  room:     string;
  messages: IMessageWithClientTimestamp[];
  users:    string[];
  friends:  string[];
}

export const PRIVATE = "private" as const;
export const PUBLIC =  "public" as const;

export interface IMessage {
  kind: typeof PRIVATE | typeof PUBLIC;
  id:   string;
  to:   string;
  from: string;
  text: string;
}

export interface IMessageWithClientTimestamp extends IMessage {
  ts: string;
}

/*

Actions

*/

export type ChatActions =
IAuthUserLogout |
IConnect |
IConnected |
IDisconnect |
IDisconnected |
IOnlineFriends |
IFriendCameOnline |
IFriendWentOffline |
IJoinRoom |
IJoinedRoom |
IRejoinedRoom |
IUserJoinedRoom |
IUserLeftRoom |
ISendMessage |
IReceivedMessage |
ISendPrivateMessage |
IReceivedPrivateMessage |
IFailedPrivateMessage;

interface IConnect {
  type: typeof actionTypes.CONNECT;
}

interface IConnected {
  type: typeof actionTypes.CONNECTED;
}

interface IDisconnect {
  type: typeof actionTypes.DISCONNECT;
}

interface IDisconnected {
  type: typeof actionTypes.DISCONNECTED;
}

interface IOnlineFriends {
  type:    typeof actionTypes.ONLINE_FRIENDS;
  friends: string[];
}

interface IFriendCameOnline {
  type:   typeof actionTypes.FRIEND_CAME_ONLINE;
  friend: string;
}

interface IFriendWentOffline {
  type:   typeof actionTypes.FRIEND_WENT_OFFLINE;
  friend: string;
}

export interface IJoinRoom {
  type: typeof actionTypes.JOIN_ROOM;
  room: string;
}

interface IJoinedRoom {
  type:  typeof actionTypes.JOINED_ROOM;
  users: string[];
  room:  string;
}

interface IRejoinedRoom {
  type:  typeof actionTypes.REJOINED_ROOM;
  users: string[];
  room:  string;
}

interface IUserJoinedRoom {
  type: typeof actionTypes.USER_JOINED_ROOM;
  user: string;
  ts:   string;
}

interface IUserLeftRoom {
  type: typeof actionTypes.USER_LEFT_ROOM;
  user: string;
  ts:   string;
}

export interface ISendMessage {
  type: typeof actionTypes.SEND_MESSAGE;
  text: string;
}

export interface IReceivedMessage {
  type:    typeof actionTypes.RECEIVED_MESSAGE;
  message: IMessageWithClientTimestamp;
}

export interface ISendPrivateMessage {
  type: typeof actionTypes.SEND_PRIVATE_MESSAGE;
  text: string;
  to:   string;
}

export interface IReceivedPrivateMessage {
  type:    typeof actionTypes.RECEIVED_PRIVATE_MESSAGE;
  message: IMessageWithClientTimestamp;
}

interface IFailedPrivateMessage {
  type:     typeof actionTypes.FAILED_PRIVATE_MESSAGE;
  feedback: string;
  ts:       string;  // ?
}