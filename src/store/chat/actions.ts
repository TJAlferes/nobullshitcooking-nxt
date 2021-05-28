import { actionTypes, IMessage } from './types';

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
  CHAT_SEND_MESSAGE,
  CHAT_RECEIVED_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE,
  CHAT_RECEIVED_PRIVATE_MESSAGE,
  CHAT_FAILED_PRIVATE_MESSAGE
} = actionTypes;

export const chatConnect = () => ({type: CHAT_CONNECT});

export const chatConnected = () => ({type: CHAT_CONNECTED});

export const chatDisconnect = () => ({type: CHAT_DISCONNECT});

export const chatDisconnected = () => ({type: CHAT_DISCONNECTED});

export const chatOnlineFriends = (online: string[]) =>
  ({type: CHAT_GET_ONLINE, online});

export const chatShowOnline = (user: string) =>
  ({type: CHAT_SHOW_ONLINE, user});

export const chatShowOffline = (user: string) =>
  ({type: CHAT_SHOW_OFFLINE, user});

export const chatChangeRoom = (room: string) =>
  ({type: CHAT_CHANGE_ROOM, room});

export const chatChangedRoom = (users: string[], room: string) =>
  ({type: CHAT_CHANGED_ROOM, users, room});

export const chatRejoinedRoom = (users: string[], room: string) =>
  ({type: CHAT_REJOINED_ROOM, users, room});

export const chatJoinedUser = (user: string) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_JOINED_USER, user, ts};
};

export const chatLeftUser = (user: string) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_LEFT_USER, user, ts};
};

export const chatSendMessage = (text: string) =>
  ({type: CHAT_SEND_MESSAGE, text});

export const chatReceivedMessage = (message: IMessage) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_RECEIVED_MESSAGE, message: {...message, ts}};
};

export const chatSendPrivateMessage = (text: string, to: string) =>
  ({type: CHAT_SEND_PRIVATE_MESSAGE, text, to});

export const chatReceivedPrivateMessage = (message: IMessage) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {
    type: CHAT_RECEIVED_PRIVATE_MESSAGE,
    message: {...message, ts}
  };
};

export const chatFailedPrivateMessage = (feedback: string) => {
  const ts = `${(new Date).toLocaleTimeString()}`;
  return {type: CHAT_FAILED_PRIVATE_MESSAGE, feedback, ts};
};