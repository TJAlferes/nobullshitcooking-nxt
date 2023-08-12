import type { Logout } from '../auth/types';

export const actionTypes = {
  CONNECT:                  'CONNECT',
  CONNECTED:                'CONNECTED',
  DISCONNECT:               'DISCONNECT',
  DISCONNECTED:             'DISCONNECTED',

  ONLINE_FRIENDS:           'ONLINE_FRIENDS',
  FRIEND_CAME_ONLINE:       'FRIEND_CAME_ONLINE',
  FRIEND_WENT_OFFLINE:      'FRIEND_WENT_OFFLINE',

  JOIN_ROOM:                'JOIN_ROOM',
  JOINED_ROOM:              'JOINED_ROOM',
  REJOINED_ROOM:            'REJOINED_ROOM',
  USER_JOINED_ROOM:         'USER_JOINED_ROOM',
  USER_LEFT_ROOM:           'USER_LEFT_ROOM',

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

// TO DO: move shared types to one location

export type State = {
  status:   string;
  room:     string;
  messages: MessageWithClientTimestamp[];
  users:    string[];
  friends:  string[];
};

export const PRIVATE = "private" as const;
export const PUBLIC =  "public" as const;

export type Message = {
  kind: typeof PRIVATE | typeof PUBLIC;
  id:   string;
  to:   string;
  from: string;
  text: string;
};

export type MessageWithClientTimestamp = Message & {
  ts: string;
};

/*

Actions

*/

export type Actions =
  | Logout
  | Connect
  | Connected
  | Disconnect
  | Disconnected
  | OnlineFriends
  | FriendCameOnline
  | FriendWentOffline
  | JoinRoom
  | JoinedRoom
  | RejoinedRoom
  | UserJoinedRoom
  | UserLeftRoom
  | SendMessage
  | ReceivedMessage
  | SendPrivateMessage
  | ReceivedPrivateMessage
  | FailedPrivateMessage;

type Connect = {
  type: typeof actionTypes.CONNECT;
};

type Connected = {
  type: typeof actionTypes.CONNECTED;
};

type Disconnect = {
  type: typeof actionTypes.DISCONNECT;
};

type Disconnected = {
  type: typeof actionTypes.DISCONNECTED;
};

type OnlineFriends = {
  type:    typeof actionTypes.ONLINE_FRIENDS;
  friends: string[];
};

type FriendCameOnline = {
  type:   typeof actionTypes.FRIEND_CAME_ONLINE;
  friend: string;
};

type FriendWentOffline = {
  type:   typeof actionTypes.FRIEND_WENT_OFFLINE;
  friend: string;
};

export type JoinRoom = {
  type: typeof actionTypes.JOIN_ROOM;
  room: string;
};

type JoinedRoom = {
  type:  typeof actionTypes.JOINED_ROOM;
  users: string[];
  room:  string;
};

type RejoinedRoom = {
  type:  typeof actionTypes.REJOINED_ROOM;
  users: string[];
  room:  string;
};

type UserJoinedRoom = {
  type: typeof actionTypes.USER_JOINED_ROOM;
  user: string;
  ts:   string;
};

type UserLeftRoom = {
  type: typeof actionTypes.USER_LEFT_ROOM;
  user: string;
  ts:   string;
};

export type SendMessage = {
  type: typeof actionTypes.SEND_MESSAGE;
  text: string;
};

export type ReceivedMessage = {
  type:    typeof actionTypes.RECEIVED_MESSAGE;
  message: MessageWithClientTimestamp;
};

export type SendPrivateMessage = {
  type: typeof actionTypes.SEND_PRIVATE_MESSAGE;
  text: string;
  to:   string;
};

export type ReceivedPrivateMessage = {
  type:    typeof actionTypes.RECEIVED_PRIVATE_MESSAGE;
  message: MessageWithClientTimestamp;
};

type FailedPrivateMessage = {
  type:     typeof actionTypes.FAILED_PRIVATE_MESSAGE;
  feedback: string;
  ts:       string;  // ?
};
