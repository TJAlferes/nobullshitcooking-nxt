import {
  connect,
  connected,
  disconnect,
  disconnected,
  getOnline,
  showOnline,
  showOffline,
  changeRoom,
  changedRoom,
  rejoinedRoom,
  joinedUser,
  leftUser,
  sendPublicMessage,
  receivedPublicMessage,
  sendPrivateMessage,
  receivedPrivateMessage,
  failedPrivateMessage
} from '../../../src/store/chat/actions';
import { actionTypes, PRIVATE, PUBLIC } from '../../../src/store/chat/types';

const {
  CONNECT,
  CONNECTED,
  DISCONNECT,
  DISCONNECTED,
  GET_ONLINE,
  SHOW_ONLINE,
  SHOW_OFFLINE,
  CHANGE_ROOM,
  CHANGED_ROOM,
  REJOINED_ROOM,
  JOINED_USER,
  LEFT_USER,
  SEND_PUBLIC_MESSAGE,
  RECEIVED_PUBLIC_MESSAGE,
  SEND_PRIVATE_MESSAGE,
  RECEIVED_PRIVATE_MESSAGE,
  FAILED_PRIVATE_MESSAGE
} = actionTypes;

const aaron = {userId: '4', username: 'Aaron'};
const alex = {userId: '5', username: 'Alex'};
const message = {
  kind: PUBLIC,
  id:   '555' + (new Date).getTime().toString(),
  to:   "GrillNChill",
  from: {userId: '555', username: "Joe555"},
  text: "Hey! How are you?"
};
const whisper = {
  kind: PRIVATE,
  id:   '32873443823428384923',
  to:   '0923849323432',
  from: {userId: '90', username: 'Jill'},
  text: 'How are you?'
};

describe('connect action creator', () => {
  it('returns the correct action type', () => {
    expect(connect().type).toEqual(CONNECT);
  });
});

describe('connected action creator', () => {
  it('returns the correct action type', () => {
    expect(connected().type).toEqual(CONNECTED);
  });
});

describe('disconnect action creator', () => {
  it('returns the correct action type', () => {
    expect(disconnect().type).toEqual(DISCONNECT);
  });
});

describe('disconnected action creator', () => {
  it('returns the correct action type', () => {
    expect(disconnected().type).toEqual(DISCONNECTED);
  });
});

describe('getOnline action creator', () => {
  it('returns the correct action type', () => {
    expect(getOnline([alex]).type).toEqual(GET_ONLINE);
  });

  it('returns the correct online', () => {
    expect(getOnline([alex]).online).toEqual([alex]);
  });
});

describe('showOnline action creator', () => {
  it('returns the correct action type', () => {
    expect(showOnline(alex).type).toEqual(SHOW_ONLINE);
  });

  it('returns the correct user', () => {
    expect(showOnline(alex).user).toEqual(alex);
  });
});

describe('showOffline action creator', () => {
  it('returns the correct action type', () => {
    expect(showOffline(alex).type).toEqual(SHOW_OFFLINE);
  });

  it('returns the correct user', () => {
    expect(showOffline(alex).user).toEqual(alex);
  });
});

describe('changeRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(changeRoom('5067').type).toEqual(CHANGE_ROOM);
  });

  it('returns the correct room', () => {
    expect(changeRoom('5067').room).toEqual('5067');
  });
});

describe('changedRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(changedRoom([aaron, alex], '5067').type).toEqual(CHANGED_ROOM);
  });

  it('returns the correct users', () => {
    expect(changedRoom([aaron, alex], '5067').users).toEqual([aaron, alex]);
  });

  it('returns the correct channel', () => {
    expect(changedRoom([aaron, alex], '5067').room).toEqual('5067');
  });
});

describe('rejoinedRoom action creator', () => {
  it('returns the correct action type', () => {
    expect(rejoinedRoom([aaron, alex], '5067').type).toEqual(REJOINED_ROOM);
  });

  it('returns the correct users', () => {
    expect(rejoinedRoom([aaron, alex], '5067').users).toEqual([aaron, alex]);
  });
  
  it('returns the correct room', () => {
    expect(rejoinedRoom([aaron, alex], '5067').room).toEqual('5067');
  });
});

describe('joinedUser action creator', () => {
  it('returns the correct action type', () => {
    expect(joinedUser(alex).type).toEqual(JOINED_USER);
  });

  it('returns the correct user', () => {
    expect(joinedUser(alex).user).toEqual(alex);
  });
});

describe('leftUser action creator', () => {
  it('returns the correct action type', () => {
    expect(leftUser(alex).type).toEqual(LEFT_USER);
  });

  it('returns the correct user', () => {
    expect(leftUser(alex).user).toEqual(alex);
  });
});

describe('sendPublicMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(sendPublicMessage('howdy').type).toEqual(SEND_PUBLIC_MESSAGE);
  });

  it('returns the correct text', () => {
    expect(sendPublicMessage('howdy').text).toEqual('howdy');
  });
});

describe('receivedPublicMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(receivedPublicMessage(message).type).toEqual(RECEIVED_PUBLIC_MESSAGE);
  });

  it('returns the correct message', () => {
    const actual = receivedPublicMessage(message).message;
    const expected = message;

    expect(actual.kind).toEqual(expected.kind);
    expect(actual.id).toEqual(expected.id);
    expect(actual.to).toEqual(expected.to);
    expect(actual.from.userId).toEqual(expected.from.userId);
    expect(actual.from.username).toEqual(expected.from.username);
    expect(actual.text).toEqual(expected.text);
  });
});

describe('sendPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(sendPrivateMessage('How are you?', 'John').type).toEqual(SEND_PRIVATE_MESSAGE);
  });

  it('returns the correct text', () => {
    expect(sendPrivateMessage('How are you?', 'John').text).toEqual('How are you?');
  });

  it('returns the correct to', () => {
    expect(sendPrivateMessage('How are you?', 'John').to).toEqual('John');
  });
});

describe('receivedPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(receivedPrivateMessage(whisper).type).toEqual(RECEIVED_PRIVATE_MESSAGE);
  });

  it('returns the correct message', () => {
    const actual = receivedPrivateMessage(whisper).privateMessage;
    const expected = whisper;

    expect(actual.kind).toEqual(expected.kind);
    expect(actual.id).toEqual(expected.id);
    expect(actual.to).toEqual(expected.to);
    expect(actual.from.userId).toEqual(expected.from.userId);
    expect(actual.from.username).toEqual(expected.from.username);
    expect(actual.text).toEqual(expected.text);
  });
});

describe('failedPrivateMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(failedPrivateMessage("User not found.").type).toEqual(FAILED_PRIVATE_MESSAGE);
  });

  it('returns the correct feedback', () => {
    expect(failedPrivateMessage("User not found.").feedback).toEqual("User not found.");
  });
});