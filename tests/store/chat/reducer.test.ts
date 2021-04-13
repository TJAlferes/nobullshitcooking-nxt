import { actionTypes as authActionTypes } from '../../../src/store/auth/types';
import { chatReducer } from '../../../src/store/chat/reducer';
import {
  actionTypes as chatActionTypes,
  PRIVATE,
  PUBLIC
} from '../../../src/store/chat/types';

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
} = chatActionTypes;

const jane = {userId: 888, username: "Jane888"};
const joe = {userId: 555, username: "Joe555"};
const clientTimeStr = (new Date).toLocaleTimeString();
const message1 = {
  kind: PUBLIC,
  id: 555 + clientTimeStr,
  to: "GrillNChill",
  from: joe,
  text: "Hey! How are you?",
  ts: `${clientTimeStr}`
};
const message2 = {
  kind: PUBLIC,
  id: 888 + clientTimeStr,
  to: "GrillNChill",
  from: jane,
  text: "I'm good, thanks! You?",
  ts: `${clientTimeStr}`
};
//const whisper1 = 
const whisper2 = {
  kind: PRIVATE,
  id: 888 + clientTimeStr,
  to: "Joe555",
  from: jane,
  text: "Are you still moving next year?",
  ts: `${clientTimeStr}`
};

const initialState = {
  room: "",
  messages: [],
  users: [],
  onlineFriends: [],
  status: "Disconnected",
  connectButtonDisabled: false,
  disconnectButtonDisabled: true,
};

describe('messenger reducer', () => {
  it('returns initial state', () => {
    expect(chatReducer(undefined, {type: CHAT_CONNECTED}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        onlineFriends: [],
        status: "Connected",
        connectButtonDisabled: true,
        disconnectButtonDisabled: false
      });
  });

  it('handles actions of type CHAT_CONNECTED', () => {
    expect(chatReducer(initialState, {type: CHAT_CONNECTED}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        onlineFriends: [],
        status: "Connected",
        connectButtonDisabled: true,
        disconnectButtonDisabled: false
      });
  });

  it('handles actions of type CHAT_DISCONNECTED', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {type: CHAT_DISCONNECTED}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        onlineFriends: [],
        status: "Disconnected",
        connectButtonDisabled: false,
        disconnectButtonDisabled: true
      });
  });

  it('handles actions of type AUTH_USER_LOGOUT', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {type: AUTH_USER_LOGOUT}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        onlineFriends: [],
        status: "Disconnected",
        connectButtonDisabled: false,
        disconnectButtonDisabled: true
      });
  });

  it('handles actions of type CHAT_GET_ONLINE', () => {
    const online = [
      {userId: 43, username: "MrClean"},
      {userId: 52, username: "Shabsquash"}
    ];

    expect(chatReducer(initialState, {type: CHAT_GET_ONLINE, online}))
      .toEqual({
        room: "",
        messages: [],
        users: [],
        onlineFriends: online,
        status: "Disconnected",
        connectButtonDisabled: false,
        disconnectButtonDisabled: true,
      });
  });

  it('handles actions of type CHAT_SHOW_ONLINE', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(
      chatReducer(beforeState, {type: CHAT_SHOW_ONLINE, user: joe})
    ).toEqual({
      room: "",
      messages: [],
      users: [],
      onlineFriends: [joe],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_SHOW_OFFLINE', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      onlineFriends: [joe],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(
      chatReducer(beforeState, {type: CHAT_SHOW_OFFLINE, user: joe})
    ).toEqual({
      room: "",
      messages: [],
      users: [],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_CHANGED_ROOM', () => {
    const beforeState = {
      room: "",
      messages: [],
      users: [],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_CHANGED_ROOM,
      room: "autos101",
      users: [{userId: 93, username: "CarEnthusiast"}]
    })).toEqual({
      room: "autos101",
      messages: [],
      users: [{userId: 93, username: "CarEnthusiast"}],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_REJOINED_ROOM', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [joe, jane],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };
    
    expect(chatReducer(beforeState, {
      type: CHAT_REJOINED_ROOM,
      room: "GrillNChill",
      users: [joe, jane]
    })).toEqual(beforeState);
  });

  it('handles actions of type CHAT_JOINED_USER', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [joe, jane],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_JOINED_USER,
      user: {userId: 23, username: "Bubbles"},
      ts: `${clientTimeStr}`
    })).toEqual({
      room: "GrillNChill",
      messages: [
        message1,
        message2,
        {
          kind: PUBLIC,
          id: 'admin' + clientTimeStr,
          to: "GrillNChill",
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: "Bubbles has joined the room.",
          ts: `${clientTimeStr}`,
        }
      ],
      users: [
        joe,
        jane,
        {userId: 23, username: "Bubbles"}
      ],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_LEFT_USER', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1, message2],
      users: [joe, jane],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_LEFT_USER,
      user: jane,
      ts: `${clientTimeStr}`
    })).toEqual({
      room: "GrillNChill",
      messages: [
        message1,
        message2,
        {
          kind: PUBLIC,
          id: 'admin' + clientTimeStr,
          to: "GrillNChill",
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: `Jane888 has left the room.`,
          ts: `${clientTimeStr}`,
        }
      ],
      users: [joe],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_RECEIVED_PUBLIC_MESSAGE', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [message1],
      users: [joe, jane],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_RECEIVED_PUBLIC_MESSAGE,
      message: message2
    })).toEqual({
      room: "GrillNChill",
      messages: [message1, message2],
      users: [joe, jane],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_RECEIVED_PRIVATE_MESSAGE', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [],
      users: [joe],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_RECEIVED_PRIVATE_MESSAGE,
      whisper: whisper2
    })).toEqual({
      room: "GrillNChill",
      messages: [whisper2],
      users: [joe],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });

  it('handles actions of type CHAT_FAILED_PRIVATE_MESSAGE', () => {
    const beforeState = {
      room: "GrillNChill",
      messages: [],
      users: [joe],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    };

    expect(chatReducer(beforeState, {
      type: CHAT_FAILED_PRIVATE_MESSAGE,
      feedback: 'User not found.',
      ts: `${clientTimeStr}`
    })).toEqual({
      room: "GrillNChill",
      messages: [
        {
          kind: PRIVATE,
          id: 'admin' + clientTimeStr,
          to: '',
          from: {userId: 'messengerstatus', username: "messengerstatus"},
          text: 'User not found.',
          ts: `${clientTimeStr}`,
        }
      ],
      users: [joe],
      onlineFriends: [],
      status: "Connected",
      connectButtonDisabled: true,
      disconnectButtonDisabled: false
    });
  });
});