import { actionTypes, IMessage, IUser } from './types';

const {
  CHAT_CONNECT,
  CHAT_CONNECTED,
  CHAT_DISCONNECT,
  CHAT_DISCONNECTED,
  CHAT_GET_ONLINE,
  CHAT_SHOW_ONLINE,
  CHAT_SHOW_OFFLINE,
  CHAT_CHANGE_ROOM,
  CHAT_CHANGED_ROOM,
  CHAT_REJOINED_ROOM,
  CHAT_JOINED_USER,
  CHAT_LEFT_USER,
  CHAT_SEND_PUBLIC_MESSAGE,
  CHAT_RECEIVED_PUBLIC_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE,
  CHAT_RECEIVED_PRIVATE_MESSAGE,
  CHAT_FAILED_PRIVATE_MESSAGE
} = actionTypes;

export const chatConnect = () => ({type: CHAT_CONNECT});

export const chatConnected = () => ({type: CHAT_CONNECTED});

export const chatDisconnect = () => ({type: CHAT_DISCONNECT});

export const chatDisconnected = () => ({type: CHAT_DISCONNECTED});

export const chatGetOnline = (online: IUser[]) =>
  ({type: CHAT_GET_ONLINE, online});

export const chatShowOnline = (user: IUser) =>
  ({type: CHAT_SHOW_ONLINE, user});

export const chatShowOffline = (user: IUser) =>
  ({type: CHAT_SHOW_OFFLINE, user});

export const chatChangeRoom = (room: string) =>
  ({type: CHAT_CHANGE_ROOM, room});

export const chatChangedRoom = (users: IUser[], room: string) =>
  ({type: CHAT_CHANGED_ROOM, users, room});

export const chatRejoinedRoom = (users: IUser[], room: string) =>
  ({type: CHAT_REJOINED_ROOM, users, room});

export const chatJoinedUser = (user: IUser) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_JOINED_USER, user, ts};
};

export const chatLeftUser = (user: IUser) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_LEFT_USER, user, ts};
};

export const chatSendPublicMessage = (text: string) =>
  ({type: CHAT_SEND_PUBLIC_MESSAGE, text});

export const chatReceivedPublicMessage = (publicMessage: IMessage) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_RECEIVED_PUBLIC_MESSAGE, message: {...publicMessage, ts}};
};

export const chatSendPrivateMessage = (text: string, to: string) =>
  ({type: CHAT_SEND_PRIVATE_MESSAGE, text, to});

export const chatReceivedPrivateMessage = (privateMessage: IMessage) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {
    type: CHAT_RECEIVED_PRIVATE_MESSAGE,
    privateMessage: {...privateMessage, ts}
  };
};

export const chatFailedPrivateMessage = (feedback: string) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_FAILED_PRIVATE_MESSAGE, feedback, ts};
};