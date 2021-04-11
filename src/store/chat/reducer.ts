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
  CHAT_GET_ONLINE,
  CHAT_SHOW_ONLINE,
  CHAT_SHOW_OFFLINE,
  CHAT_CHANGED_ROOM,
  CHAT_REJOINED_ROOM,
  CHAT_JOINED_USER,
  CHAT_LEFT_USER,
  CHAT_RECEIVED_PUBLIC_MESSAGE,
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
  status: "Disconnected",
  connectButtonDisabled: false,
  disconnectButtonDisabled: true,
};

export const chatReducer = (
  state = initialState,
  action: ChatActions
): IChatState => {
  switch (action.type) {
    case CHAT_CONNECTED:
      return {
        ...state,
        ...{
          status: "Connected",
          connectButtonDisabled: true,
          disconnectButtonDisabled: false
        }
      };
    
    case CHAT_DISCONNECTED:
    case AUTH_USER_LOGOUT:
      return {
        ...state,
        ...{
          status: "Disconnected",
          connectButtonDisabled: false,
          disconnectButtonDisabled: true
        }
      };
    
    case CHAT_GET_ONLINE:
      return {
        ...state,
        ...{onlineFriends: action.online}
      };
    
    case CHAT_SHOW_ONLINE:
      return {
        ...state,
        ...{onlineFriends: state.onlineFriends.concat(action.user)}
      };
    
    case CHAT_SHOW_OFFLINE:
      return {
        ...state,
        ...{onlineFriends: state.onlineFriends.filter(f => f !== action.user)}
      };
    
    case CHAT_CHANGED_ROOM:
      return {
        ...state,
        ...{
          room: action.room,
          messages: [],
          users: action.users
        }
      };
    
    case CHAT_REJOINED_ROOM:
      return {
        ...state,
        ...{
          room: action.room,
          users: action.users
        }
      };
    
    case CHAT_JOINED_USER:
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
    
    case CHAT_LEFT_USER:
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
    
    case CHAT_RECEIVED_PUBLIC_MESSAGE:
      return {
        ...state,
        ...{messages: state.messages.concat(action.publicMessage)}
      };
    
    case CHAT_RECEIVED_PRIVATE_MESSAGE:
      return {
        ...state,
        ...{messages: state.messages.concat(action.privateMessage)}
      };
    
    // ???
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