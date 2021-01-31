import { IAuthUserLogout } from '../auth/types';

export const actionTypes = {
  MESSENGER_CONNECT: 'MESSENGER_CONNECT',
  MESSENGER_CONNECTED: 'MESSENGER_CONNECTED',
  MESSENGER_DISCONNECT: 'MESSENGER_DISCONNECT',
  MESSENGER_DISCONNECTED: 'MESSENGER_DISCONNECTED',

  MESSENGER_GET_ONLINE: 'MESSENGER_GET_ONLINE',  // needs a better name
  MESSENGER_SHOW_ONLINE: 'MESSENGER_SHOW_ONLINE',  // needs a better name
  MESSENGER_SHOW_OFFLINE: 'MESSENGER_SHOW_OFFLINE',  // needs a better name

  MESSENGER_CHANGE_CHANNEL: 'MESSENGER_CHANGE_CHANNEL',
  MESSENGER_CHANGED_CHANNEL: 'MESSENGER_CHANGED_CHANNEL',
  MESSENGER_REJOINED_CHANNEL: 'MESSENGER_REJOINED_CHANNEL',

  MESSENGER_JOINED_USER: 'MESSENGER_JOINED_USER',  // needs a better name
  MESSENGER_LEFT_USER: 'MESSENGER_LEFT_USER',  // needs a better name

  MESSENGER_SEND_MESSAGE: 'MESSENGER_SEND_MESSAGE',
  MESSENGER_SEND_WHISPER: 'MESSENGER_SEND_WHISPER',
  MESSENGER_RECEIVED_MESSAGE: 'MESSENGER_RECEIVED_MESSAGE',
  MESSENGER_RECEIVED_WHISPER: 'MESSENGER_RECEIVED_WHISPER',
  MESSENGER_FAILED_WHISPER: 'MESSENGER_FAILED_WHISPER'
} as const;

/*

State

*/

// TO DO: double-check times

export interface IMessengerState {
  channel: string;
  messages: Message[];
  users: IUser[];
  onlineFriends: IUser[];
  status: string;
  connectButtonDisabled: boolean;
  disconnectButtonDisabled: boolean;
}

export type Message = IMessage | IWhisper;

export const KMessage = "message" as const;
export const KWhisper = "whisper" as const;

export interface IMessageBeforeClientTimestamp {
  kind: typeof KMessage;
  id: string;
  text: string;
  room: string;
  user: IUser;
}

export interface IMessage {
  kind: typeof KMessage;
  id: string;
  text: string;
  room: string;
  user: IUser;
  ts: string;
}

export interface IWhisperBeforeClientTimestamp {
  kind: typeof KWhisper;
  id: string;
  text: string;
  to: string;
  user: IUser;
}

export interface IWhisper {
  kind: typeof KWhisper;
  id: string;
  text: string;
  to: string;
  user: IUser;
  ts: string;
}

export interface IUser {
  id: number | string;
  username: string;
  avatar: string;
}

/*

Actions

*/

export type MessengerActions =
IAuthUserLogout |
IMessengerConnect |
IMessengerConnected |
IMessengerDisconnect |
IMessengerDisconnected |
IMessengerGetOnline |
IMessengerShowOnline |
IMessengerShowOffline |
IMessengerChangeChannel |
IMessengerChangedChannel |
IMessengerRejoinedChannel |
IMessengerJoinedUser |
IMessengerLeftUser |
IMessengerSendMessage |
IMessengerReceivedMessage |
IMessengerSendWhisper |
IMessengerReceivedWhisper |
IMessengerFailedWhisper;

interface IMessengerConnect {
  type: typeof actionTypes.MESSENGER_CONNECT;
}

interface IMessengerConnected {
  type: typeof actionTypes.MESSENGER_CONNECTED;
}

interface IMessengerDisconnect {
  type: typeof actionTypes.MESSENGER_DISCONNECT;
}

interface IMessengerDisconnected {
  type: typeof actionTypes.MESSENGER_DISCONNECTED;
}

interface IMessengerGetOnline {
  type: typeof actionTypes.MESSENGER_GET_ONLINE;
  online: IUser[];
}

interface IMessengerShowOnline {
  type: typeof actionTypes.MESSENGER_SHOW_ONLINE;
  user: IUser;
}

interface IMessengerShowOffline {
  type: typeof actionTypes.MESSENGER_SHOW_OFFLINE;
  user: IUser;
}

export interface IMessengerChangeChannel {
  type: typeof actionTypes.MESSENGER_CHANGE_CHANNEL;
  channel: string;
}

interface IMessengerChangedChannel {
  type: typeof actionTypes.MESSENGER_CHANGED_CHANNEL;
  users: IUser[];
  channel: string;
}

interface IMessengerRejoinedChannel {
  type: typeof actionTypes.MESSENGER_REJOINED_CHANNEL;
  users: IUser[];
  channel: string;
}

interface IMessengerJoinedUser {
  type: typeof actionTypes.MESSENGER_JOINED_USER;
  user: IUser;
  ts: string;
}

interface IMessengerLeftUser {
  type: typeof actionTypes.MESSENGER_LEFT_USER;
  user: IUser;
  ts: string;
}

export interface IMessengerSendMessage {
  type: typeof actionTypes.MESSENGER_SEND_MESSAGE;
  text: string;
}

export interface IMessengerReceivedMessage {
  type: typeof actionTypes.MESSENGER_RECEIVED_MESSAGE;
  message: IMessage;
}

export interface IMessengerSendWhisper {
  type: typeof actionTypes.MESSENGER_SEND_WHISPER;
  text: string;
  to: string;
}

export interface IMessengerReceivedWhisper {
  type: typeof actionTypes.MESSENGER_RECEIVED_WHISPER;
  whisper: IWhisper;
}

interface IMessengerFailedWhisper {
  type: typeof actionTypes.MESSENGER_FAILED_WHISPER;
  feedback: string;
  ts: string;
}