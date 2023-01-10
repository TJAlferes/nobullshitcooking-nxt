import { actionTypes, IMessage } from './types';

const {
  CONNECT,
  CONNECTED,
  DISCONNECT,
  DISCONNECTED,

  ONLINE_FRIENDS,
  FRIEND_CAME_ONLINE,
  FRIEND_WENT_OFFLINE,

  JOIN_ROOM,
  JOINED_ROOM,
  REJOINED_ROOM,

  USER_JOINED_ROOM,
  USER_LEFT_ROOM,

  SEND_MESSAGE,
  RECEIVED_MESSAGE,

  SEND_PRIVATE_MESSAGE,
  RECEIVED_PRIVATE_MESSAGE,
  FAILED_PRIVATE_MESSAGE
} = actionTypes;

function getTime() {
  return `${(new Date).toLocaleTimeString()}`;
}

export const connect =      () => ({type: CONNECT});
export const connected =    () => ({type: CONNECTED});
export const disconnect =   () => ({type: DISCONNECT});
export const disconnected = () => ({type: DISCONNECTED});

export const onlineFriends =     (friends: string[]) => ({type: ONLINE_FRIENDS, friends});
export const friendCameOnline =  (friend: string) =>    ({type: FRIEND_CAME_ONLINE, friend});
export const friendWentOffline = (friend: string) =>    ({type: FRIEND_WENT_OFFLINE, friend});

export const joinRoom =     (room: string) =>                  ({type: JOIN_ROOM, room});
export const joinedRoom =   (users: string[], room: string) => ({type: JOINED_ROOM, users, room});
export const rejoinedRoom = (users: string[], room: string) => ({type: REJOINED_ROOM, users, room});

export const userJoinedRoom = (user: string) => ({type: USER_JOINED_ROOM, user, ts: getTime()});
export const userLeftRoom =   (user: string) => ({type: USER_LEFT_ROOM, user, ts: getTime()});

export const sendMessage =     (text: string) =>      ({type: SEND_MESSAGE, text});
export const receivedMessage = (message: IMessage) => ({type: RECEIVED_MESSAGE, message: {...message, ts: getTime()}});

export const sendPrivateMessage =     (text: string, to: string) => ({type: SEND_PRIVATE_MESSAGE, text, to});
export const receivedPrivateMessage = (message: IMessage) =>        ({type: RECEIVED_PRIVATE_MESSAGE, message: {...message, ts: getTime()}});
export const failedPrivateMessage =   (feedback: string) =>         ({type: FAILED_PRIVATE_MESSAGE, feedback, ts: getTime()});