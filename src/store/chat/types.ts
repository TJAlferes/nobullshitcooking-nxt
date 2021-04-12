import { IAuthUserLogout } from '../auth/types';

export const actionTypes = {
  CHAT_CONNECT: 'CHAT_CONNECT',
  CHAT_CONNECTED: 'CHAT_CONNECTED',
  CHAT_DISCONNECT: 'CHAT_DISCONNECT',
  CHAT_DISCONNECTED: 'CHAT_DISCONNECTED',

  CHAT_GET_ONLINE: 'CHAT_GET_ONLINE',  // needs a better name FETCH_ONLINE_USERS
  CHAT_SHOW_ONLINE: 'CHAT_SHOW_ONLINE',  // needs a better name?
  CHAT_SHOW_OFFLINE: 'CHAT_SHOW_OFFLINE',  // needs a better name?

  CHAT_CHANGE_ROOM: 'CHAT_CHANGE_ROOM',
  CHAT_CHANGED_ROOM: 'CHAT_CHANGED_ROOM',
  CHAT_REJOINED_ROOM: 'CHAT_REJOINED_ROOM',

  CHAT_JOINED_USER: 'CHAT_JOINED_USER',  // needs a better name USER_JOINED_ROOM
  CHAT_LEFT_USER: 'CHAT_LEFT_USER',  // needs a better name USER_LEFT_ROOM

  CHAT_SEND_PUBLIC_MESSAGE: 'CHAT_SEND_PUBLIC_MESSAGE',
  CHAT_SEND_PRIVATE_MESSAGE: 'CHAT_SEND_PRIVATE_MESSAGE',
  CHAT_RECEIVED_PUBLIC_MESSAGE: 'CHAT_RECEIVED_PUBLIC_MESSAGE',
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
  users: IUser[];
  onlineFriends: IUser[];
  status: string;
  connectButtonDisabled: boolean;
  disconnectButtonDisabled: boolean;
}

export const PRIVATE = "private" as const;
export const PUBLIC = "public" as const;

export interface IMessage {
  kind: typeof PRIVATE | typeof PUBLIC;
  id: string;
  to: string;
  from: IUser;
  text: string;
}

export interface IMessageWithClientTimestamp extends IMessage {
  ts: string;
}

export interface IUser {
  userId: string;
  username: string;
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
IChatGetOnline |
IChatShowOnline |
IChatShowOffline |
IChatChangeRoom |
IChatChangedRoom |
IChatRejoinedRoom |
IChatJoinedUser |
IChatLeftUser |
IChatSendPublicMessage |
IChatReceivedPublicMessage |
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

interface IChatGetOnline {
  type: typeof actionTypes.CHAT_GET_ONLINE;
  online: IUser[];
}

interface IChatShowOnline {
  type: typeof actionTypes.CHAT_SHOW_ONLINE;
  user: IUser;
}

interface IChatShowOffline {
  type: typeof actionTypes.CHAT_SHOW_OFFLINE;
  user: IUser;
}

export interface IChatChangeRoom {
  type: typeof actionTypes.CHAT_CHANGE_ROOM;
  room: string;
}

interface IChatChangedRoom {
  type: typeof actionTypes.CHAT_CHANGED_ROOM;
  users: IUser[];
  room: string;
}

interface IChatRejoinedRoom {
  type: typeof actionTypes.CHAT_REJOINED_ROOM;
  users: IUser[];
  room: string;
}

interface IChatJoinedUser {
  type: typeof actionTypes.CHAT_JOINED_USER;
  user: IUser;
  ts: string;
}

interface IChatLeftUser {
  type: typeof actionTypes.CHAT_LEFT_USER;
  user: IUser;
  ts: string;
}

export interface IChatSendPublicMessage {
  type: typeof actionTypes.CHAT_SEND_PUBLIC_MESSAGE;
  text: string;
}

export interface IChatReceivedPublicMessage {
  type: typeof actionTypes.CHAT_RECEIVED_PUBLIC_MESSAGE;
  publicMessage: IMessageWithClientTimestamp;
}

export interface IChatSendPrivateMessage {
  type: typeof actionTypes.CHAT_SEND_PRIVATE_MESSAGE;
  text: string;
  to: string;
}

export interface IChatReceivedPrivateMessage {
  type: typeof actionTypes.CHAT_RECEIVED_PRIVATE_MESSAGE;
  privateMessage: IMessageWithClientTimestamp;
}

interface IChatFailedPrivateMessage {
  type: typeof actionTypes.CHAT_FAILED_PRIVATE_MESSAGE;
  feedback: string;
  ts: string;
}