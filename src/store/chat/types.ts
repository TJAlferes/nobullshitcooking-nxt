import { IAuthUserLogout } from '../auth/types';

export const actionTypes = {
  CHAT_CONNECT: 'CHAT_CONNECT',
  CHAT_CONNECTED: 'CHAT_CONNECTED',
  CHAT_DISCONNECT: 'CHAT_DISCONNECT',
  CHAT_DISCONNECTED: 'CHAT_DISCONNECTED',

  CHAT_ONLINE_FRIENDS: 'CHAT_ONLINE_FRIENDS',
  CHAT_FRIEND_CAME_ONLINE: 'CHAT_FRIEND_CAME_ONLINE',
  CHAT_FRIEND_WENT_OFFLINE: 'CHAT_FRIEND_WENT_OFFLINE',

  CHAT_JOIN_ROOM: 'CHAT_JOIN_ROOM',
  CHAT_JOINED_ROOM: 'CHAT_JOINED_ROOM',
  CHAT_REJOINED_ROOM: 'CHAT_REJOINED_ROOM',

  CHAT_USER_JOINED_ROOM: 'CHAT_USER_JOINED_ROOM',
  CHAT_USER_LEFT_ROOM: 'CHAT_USER_LEFT_ROOM',

  CHAT_SEND_MESSAGE: 'CHAT_SEND_MESSAGE',
  CHAT_SEND_PRIVATE_MESSAGE: 'CHAT_SEND_PRIVATE_MESSAGE',
  CHAT_RECEIVED_MESSAGE: 'CHAT_RECEIVED_MESSAGE',
  CHAT_RECEIVED_PRIVATE_MESSAGE: 'CHAT_RECEIVED_PRIVATE_MESSAGE',
  CHAT_FAILED_PRIVATE_MESSAGE: 'CHAT_FAILED_PRIVATE_MESSAGE'
} as const;

/*

State

*/

// TO DO: double-check times

export interface IChatState {
  room: string;
  messages: IMessageWithClientTimestamp[];
  users: string[];
  onlineFriends: string[];
  status: string;
}

export const PRIVATE = "private" as const;
export const PUBLIC = "public" as const;

export interface IMessage {
  kind: typeof PRIVATE | typeof PUBLIC;
  id: string;
  to: string;
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
IChatConnect |
IChatConnected |
IChatDisconnect |
IChatDisconnected |
IChatOnlineFriends |
IChatFriendCameOnline |
IChatFriendWentOffline |
IChatJoinRoom |
IChatJoinedRoom |
IChatRejoinedRoom |
IChatUserJoinedRoom |
IChatUserLeftRoom |
IChatSendMessage |
IChatReceivedMessage |
IChatSendPrivateMessage |
IChatReceivedPrivateMessage |
IChatFailedPrivateMessage;

interface IChatConnect {
  type: typeof actionTypes.CHAT_CONNECT;
}

interface IChatConnected {
  type: typeof actionTypes.CHAT_CONNECTED;
}

interface IChatDisconnect {
  type: typeof actionTypes.CHAT_DISCONNECT;
}

interface IChatDisconnected {
  type: typeof actionTypes.CHAT_DISCONNECTED;
}

interface IChatOnlineFriends {
  type: typeof actionTypes.CHAT_ONLINE_FRIENDS;
  onlineFriends: string[];
}

interface IChatFriendCameOnline {
  type: typeof actionTypes.CHAT_FRIEND_CAME_ONLINE;
  friend: string;
}

interface IChatFriendWentOffline {
  type: typeof actionTypes.CHAT_FRIEND_WENT_OFFLINE;
  friend: string;
}

export interface IChatJoinRoom {
  type: typeof actionTypes.CHAT_JOIN_ROOM;
  room: string;
}

interface IChatJoinedRoom {
  type: typeof actionTypes.CHAT_JOINED_ROOM;
  users: string[];
  room: string;
}

interface IChatRejoinedRoom {
  type: typeof actionTypes.CHAT_REJOINED_ROOM;
  users: string[];
  room: string;
}

interface IChatUserJoinedRoom {
  type: typeof actionTypes.CHAT_USER_JOINED_ROOM;
  user: string;
  ts: string;
}

interface IChatUserLeftRoom {
  type: typeof actionTypes.CHAT_USER_LEFT_ROOM;
  user: string;
  ts: string;
}

export interface IChatSendMessage {
  type: typeof actionTypes.CHAT_SEND_MESSAGE;
  text: string;
}

export interface IChatReceivedMessage {
  type: typeof actionTypes.CHAT_RECEIVED_MESSAGE;
  message: IMessageWithClientTimestamp;
}

export interface IChatSendPrivateMessage {
  type: typeof actionTypes.CHAT_SEND_PRIVATE_MESSAGE;
  text: string;
  to: string;
}

export interface IChatReceivedPrivateMessage {
  type: typeof actionTypes.CHAT_RECEIVED_PRIVATE_MESSAGE;
  message: IMessageWithClientTimestamp;
}

interface IChatFailedPrivateMessage {
  type: typeof actionTypes.CHAT_FAILED_PRIVATE_MESSAGE;
  feedback: string;
  ts: string;  // ?
}