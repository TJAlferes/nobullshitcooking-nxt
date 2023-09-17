import { actionTypes as authenticationActionTypes } from '../user/authentication/state';
import type { Logout } from '../user/authentication/state';

// CONSIDER: normalize state (use objects/maps, not arrays), see Nir Kofman's action patterns
// TO DO: reserve/disable the username "messengerstatus"!

const initialState: State = {
  connected: false,
  room:     "",
  messages: [],
  users:    [],
  friends:  []
};

export const chatReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case "connected":
      return {...state, connected: true};

    case "disconnected":
    case LOGOUT:
      return {...state, connected: false};
    
    case ONLINE_FRIENDS:
      return {...state, friends: action.friends};
    case FRIEND_CAME_ONLINE:
      return {...state, friends: state.friends.concat(action.friend)};
    case FRIEND_WENT_OFFLINE:
      return {...state, friends: state.friends.filter(f => f !== action.friend)};

    case JOINED_ROOM:
      return {...state, room: action.room, messages: [], users: action.users};
    case REJOINED_ROOM:
      return {...state, room: action.room, users: action.users};

    case USER_JOINED_ROOM:
      return {
        ...state,
        messages: state.messages.concat({
          kind: PUBLIC,
          id:   "admin" + action.ts,
          to:   state.room,
          from: "messengerstatus",
          text: `${action.user} has joined the room.`,
          ts:   action.ts
        }),
        users: state.users.concat(action.user)
      };
    case USER_LEFT_ROOM:
      return {
        ...state,
        messages: state.messages.concat({
          kind: PUBLIC,
          id:   "admin" + action.ts,
          to:   state.room,
          from: "messengerstatus",
          text: `${action.user} has left the room.`,
          ts:   action.ts
        }),
        users: state.users.filter(u => u !== action.user)
      };
    
    case RECEIVED_MESSAGE:
      return {...state, messages: state.messages.concat(action.message)};
    case RECEIVED_PRIVATE_MESSAGE:
      return {...state, messages: state.messages.concat(action.message)};
    // ?
    case FAILED_PRIVATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat({
          kind: PRIVATE,
          id:   "admin" + action.ts,
          to:   "",
          from: "messengerstatus",
          text: action.feedback,
          ts:   action.ts
        })
      };
    
    default: return state;
  }
};

// TO DO: you can still localize here, but let database create the timestamps

function getTime() {
  return `${(new Date).toLocaleTimeString()}`;
}

export const onlineFriends = (friends: string[]) =>
  ({type: ONLINE_FRIENDS, friends});

export const friendCameOnline = (friend: string) =>
  ({type: FRIEND_CAME_ONLINE, friend});

export const friendWentOffline = (friend: string) =>
  ({type: FRIEND_WENT_OFFLINE, friend});

export const joinRoom = (room: string) =>
  ({type: JOIN_ROOM, room});

export const joinedRoom = (users: string[], room: string) =>
  ({type: JOINED_ROOM, users, room});

export const rejoinedRoom = (users: string[], room: string) =>
  ({type: REJOINED_ROOM, users, room});

export const userJoinedRoom = (user: string) =>
  ({type: USER_JOINED_ROOM, user, ts: getTime()});

export const userLeftRoom = (user: string) =>
  ({type: USER_LEFT_ROOM, user, ts: getTime()});

export const sendMessage = (text: string) =>
  ({type: SEND_MESSAGE, text});

export const receivedMessage = (message: Message) =>
  ({type: RECEIVED_MESSAGE, message: {...message, ts: getTime()}});

export const sendPrivateMessage = (text: string, to: string) =>
  ({type: SEND_PRIVATE_MESSAGE, text, to});

export const receivedPrivateMessage = (message: Message) =>
  ({type: RECEIVED_PRIVATE_MESSAGE, message: {...message, ts: getTime()}});

export const failedPrivateMessage = (feedback: string) =>
  ({type: FAILED_PRIVATE_MESSAGE, feedback, ts: getTime()});

// TO DO: double-check times

export type State = {
  connected: boolean;
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

const { LOGOUT } = authenticationActionTypes;

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
