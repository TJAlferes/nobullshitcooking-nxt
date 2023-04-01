import { actionTypes as authActionTypes } from '../auth/types';
import { actionTypes, State, PUBLIC, PRIVATE, Actions } from './types';

const { LOGOUT } = authActionTypes;
const {
  CONNECTED,
  DISCONNECTED,

  ONLINE_FRIENDS,
  FRIEND_CAME_ONLINE,
  FRIEND_WENT_OFFLINE,

  JOINED_ROOM,
  REJOINED_ROOM,
  USER_JOINED_ROOM,
  USER_LEFT_ROOM,
  
  RECEIVED_MESSAGE,
  RECEIVED_PRIVATE_MESSAGE,
  FAILED_PRIVATE_MESSAGE
} = actionTypes;

// CONSIDER: normalize state (use objects/maps, not arrays), see Nir Kofman's action patterns
// TO DO: reserve/disable the username "messengerstatus"!

const initialState: State = {
  status:   "disconnected",
  room:     "",
  messages: [],
  users:    [],
  friends:  []
};

export const chatReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case CONNECTED: return {...state, status: "connected"};
    case DISCONNECTED:
    case LOGOUT:
      return {...state, status: "disconnected"};
    
    case ONLINE_FRIENDS:      return {...state, friends: action.friends};
    case FRIEND_CAME_ONLINE:  return {...state, friends: state.friends.concat(action.friend)};
    case FRIEND_WENT_OFFLINE: return {...state, friends: state.friends.filter(f => f !== action.friend)};

    case JOINED_ROOM:         return {...state, room: action.room, messages: [], users: action.users};
    case REJOINED_ROOM:       return {...state, room: action.room, users: action.users};

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
    
    case RECEIVED_MESSAGE:         return {...state, messages: state.messages.concat(action.message)};
    case RECEIVED_PRIVATE_MESSAGE: return {...state, messages: state.messages.concat(action.message)};
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
