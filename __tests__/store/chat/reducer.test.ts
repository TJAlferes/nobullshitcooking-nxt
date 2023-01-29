import { actionTypes as authActionTypes } from '../../../src/store/auth/types';
import { chatReducer } from '../../../src/store/chat/reducer';
import { actionTypes as chatActionTypes, IState, PRIVATE, PUBLIC } from '../../../src/store/chat/types';

const { USER_LOGOUT } = authActionTypes;
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
  SEND_PRIVATE_MESSAGE,
  RECEIVED_MESSAGE,
  RECEIVED_PRIVATE_MESSAGE,
  FAILED_PRIVATE_MESSAGE
} = chatActionTypes;

const time = (new Date).toLocaleTimeString();
const jack = {userId: 7, username: "Jack"};
const jill = {userId: 8, username: "Jill"};
const message1 = {kind: PUBLIC, id: 7 + time, to: "GrillNChill", from: jack, text: "Hey! How are you?",  ts: `${time}`};
const message2 = {kind: PUBLIC, id: 8 + time, to: "GrillNChill", from: jill, text: "Good, thanks! You?", ts: `${time}`};
//const whisper1 = 
const whisper2 = {kind: PRIVATE, id: 8 + time, to: "Jack", from: jill, text: "Are you still moving next year?", ts: `${time}`};

const initialState: IState = {
  status:   "disconnected",
  room:     "",
  messages: [],
  users:    [],
  friends:  []
};

describe('messenger reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = chatReducer(state, {type: DISCONNECTED});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type CONNECTED', () => {
    const state =   {...initialState};
    const reducer = chatReducer(state, {type: CONNECTED});
    expect(reducer.status).toEqual("Connected");
  });

  it('handles actions of type DISCONNECTED', () => {
    const state =   {...initialState};
    state.status =  "connected";
    const reducer = chatReducer(state, {type: DISCONNECTED});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type AUTH_USER_LOGOUT', () => {
    const state =   {...initialState};
    state.status =  "connected";
    const reducer = chatReducer(state, {type: AUTH_USER_LOGOUT});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type GET_ONLINE', () => {
    expect(chatReducer(initialState, {type: GET_ONLINE, ["John", "Jane"]}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        friends: ["John", "Jane"],
        status: "disconnected"
      });
  });

  it('handles actions of type SHOW_ONLINE', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: SHOW_ONLINE, user: jack})).toEqual({
      room: "",
      messages: [],
      users: [],
      friends: [jack],
      status: "connected"
    });
  });

  it('handles actions of type SHOW_OFFLINE', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      friends: [jack],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: SHOW_OFFLINE, user: jack})).toEqual({
      room: "",
      messages: [],
      users: [],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type CHANGED_ROOM', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: CHANGED_ROOM, room: "autos101", users: [{userId: 93, username: "CarEnthusiast"}]})).toEqual({
      room: "autos101",
      messages: [],
      users: [{userId: 93, username: "CarEnthusiast"}],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type REJOINED_ROOM', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [jack, jill],
      friends: [],
      status: "connected"
    };
    
    expect(chatReducer(beforeState, {type: REJOINED_ROOM, room: "GrillNChill", users: [jack, jill]})).toEqual(beforeState);
  });

  it('handles actions of type JOINED_USER', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [jack, jill],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: JOINED_USER, user: {userId: 23, username: "Bubbles"}, ts: `${time}`})).toEqual({
      room: "GrillNChill",
      messages: [
        message1,
        message2,
        {
          kind: PUBLIC,
          id: 'admin' + time,
          to: "GrillNChill",
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: "Bubbles has joined the room.",
          ts: `${time}`,
        }
      ],
      users: [
        jack,
        jill,
        {userId: 23, username: "Bubbles"}
      ],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type LEFT_USER', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [jack, jill],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: LEFT_USER, user: jill, ts: `${time}`})).toEqual({
      room: "GrillNChill",
      messages: [
        message1,
        message2,
        {
          kind: PUBLIC,
          id: 'admin' + time,
          to: "GrillNChill",
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: `jill888 has left the room.`,
          ts: `${time}`,
        }
      ],
      users: [jack],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type RECEIVED_PUBLIC_MESSAGE', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1],
      users: [jack, jill],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: RECEIVED_PUBLIC_MESSAGE, message: message2})).toEqual({
      room: "GrillNChill",
      messages: [message1, message2],
      users: [jack, jill],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type RECEIVED_PRIVATE_MESSAGE', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [],
      users: [jack],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: RECEIVED_PRIVATE_MESSAGE, whisper: whisper2})).toEqual({
      room: "GrillNChill",
      messages: [whisper2],
      users: [jack],
      friends: [],
      status: "connected"
    });
  });

  it('handles actions of type FAILED_PRIVATE_MESSAGE', () => {
    const state = {...initialState};
    const beforeState = {
      room: "GrillNChill",
      messages: [],
      users: [jack],
      friends: [],
      status: "connected"
    };

    expect(chatReducer(beforeState, {type: FAILED_PRIVATE_MESSAGE, feedback: 'User not found.', ts: `${time}`})).toEqual({
      room: "GrillNChill",
      messages: [
        {
          kind: PRIVATE,
          id: 'admin' + time,
          to: '',
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: 'User not found.',
          ts: `${time}`,
        }
      ],
      users: [jack],
      friends: [],
      status: "connected"
    });
  });
});