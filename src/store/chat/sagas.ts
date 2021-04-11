import { Store } from 'redux';
import io from 'socket.io-client';

import {
  NOBSCBackendAPIEndpointOne
} from '../../config/NOBSCBackendAPIEndpointOne';
import {
  chatConnected,
  chatDisconnected,
  chatGetOnline,
  chatShowOnline,
  chatShowOffline,
  chatChangedRoom,
  chatRejoinedRoom,
  chatJoinedUser,
  chatLeftUser,
  chatReceivedPublicMessage,
  chatReceivedPrivateMessage,
  chatFailedPrivateMessage
} from './actions';
import {
  IMessage,
  IChatChangeRoom,
  IChatSendPublicMessage,
  IChatSendPrivateMessage
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function chatInit(store: Store) {
  if (typeof window === 'undefined') return;

  const socket = io.connect(`${endpoint}`, {
    autoConnect: false,
    reconnection: true
  });
  //const socket = io(`${endpoint}`, {withCredentials: true});

  // TO DO: make better event names (server side too)

  /*

  Users

  */

  socket.on('GetOnline', (online: []) => {
    if (!online) return;
    store.dispatch(chatGetOnline(online));
  });

  socket.on('ShowOnline', (user: string) => {
    if (!user) return;
    store.dispatch(chatShowOnline(user));
  });

  socket.on('ShowOffline', (user: string) => {
    if (!user) return;
    store.dispatch(chatShowOffline(user));
  });

  /*

  Messages

  */

  socket.on('AddPublicMessage', (message: IMessage) => {
    if (!message) return;
    store.dispatch(chatReceivedPublicMessage(message));
  });

  socket.on('AddPrivateMessage', (privateMessage: IMessage) => {
    if (!privateMessage) return;
    store.dispatch(chatReceivedPrivateMessage(privateMessage));
  });

  socket.on('FailedPrivateMessage', (feedback: string) => {
    if (!feedback) return;
    store.dispatch(chatFailedPrivateMessage(feedback));
  });

  /*

  Rooms

  */

  socket.on('GetUser', (users: [], roomToAdd: string) => {
    if (!users || !roomToAdd) return;
    store.dispatch(chatChangedRoom(users, roomToAdd));
  });

  socket.on('RegetUser', (users: [], roomToRejoin: string) => {
    if (!users || !roomToRejoin) return;
    store.dispatch(chatRejoinedRoom(users, roomToRejoin));
  });

  socket.on('AddUser', (user: string) => {
    if (!user) return;
    store.dispatch(chatJoinedUser(user));
  });

  socket.on('RemoveUser', (user: string) => {
    if (!user) return;
    store.dispatch(chatLeftUser(user));
  });

  /*

  SocketIO Events

  */

  socket.on('connect', () => {
    store.dispatch(chatConnected());
    socket.emit('GetOnline');
  });

  socket.on('disconnect', () => {
    store.dispatch(chatDisconnected());
  });

  socket.on('reconnect', () => {
    chatRejoinRoomSaga();
  });
}

/*

Sagas

*/

// use call([socket, socket.method(), ...args])
// these don't even need to be sagas
// channels?

export function* chatConnectSaga() {
  socket.connect();
}

export function* chatDisconnectSaga() {
  socket.disconnect();
}

export function* chatChangeRoomSaga(action: IChatChangeRoom) {
  socket.emit('AddRoom', action.room);
}

export function* chatSendPublicMessageSaga(action: IChatSendPublicMessage) {
  socket.emit('AddMessage', action.text);
}

export function* chatSendPrivateMessageSaga(action: IChatSendPrivateMessage) {
  socket.emit('AddWhisper', action.text, action.to);
}

// pass store in from actions?
export function* chatUpdateOnlineSaga() {
  const { chat } = store.getState();
  if (chat.status === "Connected") socket.emit('GetOnline');
}

export function chatRejoinRoomSaga() {
  const { chat } = store.getState();
  if (chat.channel === "") return;
  socket.emit('RejoinRoom', chat.channel);
}