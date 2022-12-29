import { actionTypes, IMessage } from './types';

const {
  CHAT_CONNECT, CHAT_CONNECTED, CHAT_DISCONNECT, CHAT_DISCONNECTED,
  CHAT_ONLINE_FRIENDS, CHAT_FRIEND_CAME_ONLINE, CHAT_FRIEND_WENT_OFFLINE,
  CHAT_JOIN_ROOM, CHAT_JOINED_ROOM, CHAT_REJOINED_ROOM,
  CHAT_USER_JOINED_ROOM, CHAT_USER_LEFT_ROOM,
  CHAT_SEND_MESSAGE, CHAT_RECEIVED_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE, CHAT_RECEIVED_PRIVATE_MESSAGE, CHAT_FAILED_PRIVATE_MESSAGE
} = actionTypes;

function getTime() {
  return `${(new Date).toLocaleTimeString()}`
}

export const chatConnect =      () => ({type: CHAT_CONNECT});
export const chatConnected =    () => ({type: CHAT_CONNECTED});
export const chatDisconnect =   () => ({type: CHAT_DISCONNECT});
export const chatDisconnected = () => ({type: CHAT_DISCONNECTED});

export const chatOnlineFriends =     (onlineFriends: string[]) => ({type: CHAT_ONLINE_FRIENDS, onlineFriends});
export const chatFriendCameOnline =  (friend: string) =>          ({type: CHAT_FRIEND_CAME_ONLINE, friend});
export const chatFriendWentOffline = (friend: string) =>          ({type: CHAT_FRIEND_WENT_OFFLINE, friend});

export const chatJoinRoom =     (room: string) =>                  ({type: CHAT_JOIN_ROOM, room});
export const chatJoinedRoom =   (users: string[], room: string) => ({type: CHAT_JOINED_ROOM, users, room});
export const chatRejoinedRoom = (users: string[], room: string) => ({type: CHAT_REJOINED_ROOM, users, room});

export const chatUserJoinedRoom = (user: string) => ({type: CHAT_USER_JOINED_ROOM, user, ts: getTime()});
export const chatUserLeftRoom =   (user: string) => ({type: CHAT_USER_LEFT_ROOM, user, ts: getTime()});

export const chatSendMessage =     (text: string) =>      ({type: CHAT_SEND_MESSAGE, text});
export const chatReceivedMessage = (message: IMessage) => ({type: CHAT_RECEIVED_MESSAGE, message: {...message, ts: getTime()}});

export const chatSendPrivateMessage =     (text: string, to: string) => ({type: CHAT_SEND_PRIVATE_MESSAGE, text, to});
export const chatReceivedPrivateMessage = (message: IMessage) =>        ({type: CHAT_RECEIVED_PRIVATE_MESSAGE, message: {...message, ts: getTime()}});
export const chatFailedPrivateMessage =   (feedback: string) =>         ({type: CHAT_FAILED_PRIVATE_MESSAGE, feedback, ts: getTime()});