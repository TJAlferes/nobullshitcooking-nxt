import {
  chatConnect,
  chatConnected,
  chatDisconnect,
  chatDisconnected,
  chatGetOnline,
  chatShowOnline,
  chatShowOffline,
  chatChangeRoom,
  chatChangedRoom,
  chatRejoinedRoom,
  chatJoinedUser,
  chatLeftUser,
  chatSendPublicMessage,
  chatReceivedPublicMessage,
  chatSendPrivateMessage,
  chatReceivedPrivateMessage,
  chatFailedPrivateMessage
} from '../../../src/store/chat/actions';
import { actionTypes, PRIVATE, PUBLIC } from '../../../src/store/chat/types';

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
  CHAT_SEND_PUBLIC_MESSAGE,
  CHAT_RECEIVED_PUBLIC_MESSAGE,
  CHAT_SEND_PRIVATE_MESSAGE,
  CHAT_RECEIVED_PRIVATE_MESSAGE,
  CHAT_FAILED_PRIVATE_MESSAGE
} = actionTypes;

const aaron = {userId: '4', username: 'Aaron'};
const alex = {userId: '5', username: 'Alex'};
const message = {
  kind: PUBLIC,
  id: '555' + (new Date).getTime().toString(),
  to: "GrillNChill",
  from: {userId: '555', username: "Joe555"},
  text: "Hey! How are you?"
};
const whisper = {
  kind: PRIVATE,
  id: '32873443823428384923',
  to: '0923849323432',
  from: {userId: '90', username: 'Jill'},
  text: 'How are you?'
};

describe('chatConnect action creator', () => {
  it('returns the correct action type', () => {
    expect(chatConnect().type).toEqual(CHAT_CONNECT);
  });
});

describe('chatConnected action creator', () => {
  it('returns the correct action type', () => {
    expect(chatConnected().type).toEqual(CHAT_CONNECTED);
  });
});

describe('chatDisconnect action creator', () => {
  it('returns the correct action type', () => {
    expect(chatDisconnect().type).toEqual(CHAT_DISCONNECT);
  });
});

describe('chatDisconnected action creator', () => {
  it('returns the correct action type', () => {
    expect(chatDisconnected().type).toEqual(CHAT_DISCONNECTED);
  });
});

describe('chatGetOnline action creator', () => {
  it('returns the correct action type', () => {
    expect(chatGetOnline([alex]).type).toEqual(CHAT_GET_ONLINE);
  });

  it('returns the correct online', () => {
    expect(chatGetOnline([alex]).online).toEqual([alex]);
  });
});

describe('chatShowOnline action creator', () => {
  it('returns the correct action type', () => {
    expect(chatShowOnline(alex).type).toEqual(CHAT_SHOW_ONLINE);
  });

  it('returns the correct user', () => {
    expect(chatShowOnline(alex).user).toEqual(alex);
  });
});

describe('chatShowOffline action creator', () => {
  it('returns the correct action type', () => {
    expect(chatShowOffline(alex).type).toEqual(CHAT_SHOW_OFFLINE);
  });

  it('returns the correct user', () => {
    expect(chatShowOffline(alex).user).toEqual(alex);
  });
});

describe('chatChangeRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(chatChangeRoom('5067').type).toEqual(CHAT_CHANGE_ROOM);
  });

  it('returns the correct room', () => {
    expect(chatChangeRoom('5067').room).toEqual('5067');
  });
});

describe('chatChangedRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(chatChangedRoom([aaron, alex], '5067').type)
      .toEqual(CHAT_CHANGED_ROOM);
  });

  it('returns the correct users', () => {
    expect(chatChangedRoom([aaron, alex], '5067').users).toEqual([aaron, alex]);
  });

  it('returns the correct channel', () => {
    expect(chatChangedRoom([aaron, alex], '5067').room).toEqual('5067');
  });
});

describe('chatRejoinedRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(chatRejoinedRoom([aaron, alex], '5067').type)
      .toEqual(CHAT_REJOINED_ROOM);
  });

  it('returns the correct users', () => {
    expect(chatRejoinedRoom([aaron, alex], '5067').users)
      .toEqual([aaron, alex]);
  });
  
  it('returns the correct room', () => {
    expect(chatRejoinedRoom([aaron, alex], '5067').room).toEqual('5067');
  });
});

describe('chatJoinedUser action creator', () => {
  it('returns the correct action type', () => {
    expect(chatJoinedUser(alex).type).toEqual(CHAT_JOINED_USER);
  });

  it('returns the correct user', () => {
    expect(chatJoinedUser(alex).user).toEqual(alex);
  });
});

describe('chatLeftUser action creator', () => {
  it('returns the correct action type', () => {
    expect(chatLeftUser(alex).type).toEqual(CHAT_LEFT_USER);
  });

  it('returns the correct user', () => {
    expect(chatLeftUser(alex).user).toEqual(alex);
  });
});

describe('chatSendPublicMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(chatSendPublicMessage('howdy').type)
      .toEqual(CHAT_SEND_PUBLIC_MESSAGE);
  });

  it('returns the correct text', () => {
    expect(chatSendPublicMessage('howdy').text).toEqual('howdy');
  });
});

describe('chatReceivedPublicMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(chatReceivedPublicMessage(message).type)
      .toEqual(CHAT_RECEIVED_PUBLIC_MESSAGE);
  });

  it('returns the correct message', () => {
    const actual = chatReceivedPublicMessage(message).message;
    const expected = message;

    expect(actual.kind).toEqual(expected.kind);
    expect(actual.id).toEqual(expected.id);
    expect(actual.to).toEqual(expected.to);
    expect(actual.from.userId).toEqual(expected.from.userId);
    expect(actual.from.username).toEqual(expected.from.username);
    expect(actual.text).toEqual(expected.text);
  });
});

describe('chatSendPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(chatSendPrivateMessage('How are you?', 'John').type)
      .toEqual(CHAT_SEND_PRIVATE_MESSAGE);
  });

  it('returns the correct text', () => {
    expect(chatSendPrivateMessage('How are you?', 'John').text)
      .toEqual('How are you?');
  });

  it('returns the correct to', () => {
    expect(chatSendPrivateMessage('How are you?', 'John').to).toEqual('John');
  });
});

describe('chatReceivedPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(chatReceivedPrivateMessage(whisper).type)
      .toEqual(CHAT_RECEIVED_PRIVATE_MESSAGE);
  });

  it('returns the correct ', () => {
    const actual = chatReceivedPrivateMessage(whisper).privateMessage;
    const expected = whisper;

    expect(actual.kind).toEqual(expected.kind);
    expect(actual.id).toEqual(expected.id);
    expect(actual.to).toEqual(expected.to);
    expect(actual.from.userId).toEqual(expected.from.userId);
    expect(actual.from.username).toEqual(expected.from.username);
    expect(actual.text).toEqual(expected.text);
  });
});

describe('chatFailedPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(chatFailedPrivateMessage("User not found.").type)
      .toEqual(CHAT_FAILED_PRIVATE_MESSAGE);
  });

  it('returns the correct feedback', () => {
    expect(chatFailedPrivateMessage("User not found.").feedback)
      .toEqual("User not found.");
  });
});