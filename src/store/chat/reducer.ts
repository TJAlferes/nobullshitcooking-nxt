import { actionTypes as authActionTypes } from '../auth/types';
import {
  actionTypes,
  IChatState,
  PUBLIC,
  PRIVATE,
  ChatActions
} from './types';

const { AUTH_USER_LOGOUT } = authActionTypes;
const {
  CHAT_CONNECTED,
  CHAT_DISCONNECTED,
  CHAT_ONLINE_FRIENDS,
  CHAT_FRIEND_CAME_ONLINE,
  CHAT_FRIEND_WENT_OFFLINE,
  CHAT_JOINED_ROOM,
  CHAT_REJOINED_ROOM,
  CHAT_USER_JOINED_ROOM,
  CHAT_USER_LEFT_ROOM,
  CHAT_RECEIVED_MESSAGE,
  CHAT_RECEIVED_PRIVATE_MESSAGE,
  CHAT_FAILED_PRIVATE_MESSAGE
} = actionTypes;

// NORMALIZE STATE, USE OBJECTS/MAPS, NOT ARRAYS (maybe)
// remember Nir Kofman's actions patterns (maybe)

const initialState: IChatState = {
  room: "",
  messages: [],
  users: [],
  onlineFriends: [],
  status: "disconnected"
};

export const chatReducer = (
  state = initialState,
  action: ChatActions
): IChatState => {
  switch (action.type) {
    case CHAT_CONNECTED:
      return {...state, ...{status: "connected"}};
    
    case CHAT_DISCONNECTED:
    case AUTH_USER_LOGOUT:
      return {...state, ...{status: "disconnected"}};
    
    case CHAT_ONLINE_FRIENDS:
      return {
        ...state,
        ...{onlineFriends: action.onlineFriends}
      };
    
    case CHAT_FRIEND_CAME_ONLINE:
      return {
        ...state,
        ...{onlineFriends: state.onlineFriends.concat(action.friend)}
      };
    
    case CHAT_FRIEND_WENT_OFFLINE:
      return {
        ...state,
        ...{onlineFriends: state.onlineFriends.filter(f => f !== action.friend)}
      };
    
    case CHAT_JOINED_ROOM:
      return {
        ...state,
        ...{room: action.room, messages: [], users: action.users}
      };
    
    case CHAT_REJOINED_ROOM:
      return {...state, ...{room: action.room, users: action.users}};
    
    case CHAT_USER_JOINED_ROOM:
      return {
        ...state,
        ...{
          messages: state.messages.concat({
            kind: PUBLIC,
            id: 'admin' + action.ts,
            to: state.room,
            from: "messengerstatus",
            text: `${action.user} has joined the room.`,
            ts: action.ts,
          }),
          users: state.users.concat(action.user)
        }
      };
    
    case CHAT_USER_LEFT_ROOM:
      return {
        ...state,
        ...{
          messages: state.messages.concat({
            kind: PUBLIC,
            id: 'admin' + action.ts,
            to: state.room,
            from: "messengerstatus",
            text: `${action.user} has left the room.`,
            ts: action.ts,
          }),
          users: state.users.filter(u => u !== action.user)
        }
      };
    
    case CHAT_RECEIVED_MESSAGE:
      return {...state, ...{messages: state.messages.concat(action.message)}};
    
    case CHAT_RECEIVED_PRIVATE_MESSAGE:
      return {...state, ...{messages: state.messages.concat(action.message)}};
    
    // ?
    case CHAT_FAILED_PRIVATE_MESSAGE:
      return {
        ...state,
        ...{
          messages: state.messages.concat({
            kind: PRIVATE,
            id: 'admin' + action.ts,
            to: '',
            from: "messengerstatus",
            text: action.feedback,
            ts: action.ts,
          })
        }
      };
    
    default: return state;
  }
};