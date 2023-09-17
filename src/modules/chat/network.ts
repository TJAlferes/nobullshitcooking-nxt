import { io }          from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import { endpoint } from '../../config/api';
import {
  connected,
  disconnected,
  onlineFriends,
  friendCameOnline,
  friendWentOffline,
  joinedRoom,
  rejoinedRoom,
  userJoinedRoom,
  userLeftRoom,
  receivedMessage,
  receivedPrivateMessage,
  failedPrivateMessage
} from './state';
import type { Message, JoinRoom, SendMessage, SendPrivateMessage } from './state';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${endpoint}`,
  {autoConnect: false, withCredentials: true}
);

export function setupChat() {
  const chat     = useChat();
  const dispatch = useChatDispatch();

  socket.on('connect', () => {
    dispatch(connected());
    socket.emit('GetOnlineFriends');
  });

  socket.on('disconnect', () => dispatch(disconnected()));

  socket.io.on('reconnect', () => {
    const room = store.getState().chat.room;
    if (room === "") return;  // ?
    socket.emit('RejoinRoom', room);
  });

  socket.on('OnlineFriends',        (friends) => dispatch(onlineFriends(friends)));
  socket.on('FriendCameOnline',     (friend) =>  dispatch(friendCameOnline(friend)));
  socket.on('FriendWentOffline',    (friend) =>  dispatch(friendWentOffline(friend)));

  socket.on('UsersInRoom',          (users, room) => dispatch(joinedRoom(users, room)));
  socket.on('UsersInRoomRefetched', (users, room) => dispatch(rejoinedRoom(users, room)));

  socket.on('UserJoinedRoom',       (user) => dispatch(userJoinedRoom(user)));
  socket.on('UserLeftRoom',         (user) => dispatch(userLeftRoom(user)));

  socket.on('Message',              (message) =>  dispatch(receivedMessage(message)));
  socket.on('PrivateMessage',       (message) =>  dispatch(receivedPrivateMessage(message)));
  socket.on('FailedPrivateMessage', (feedback) => dispatch(failedPrivateMessage(feedback)));
}

const connect = () => {
  socket.connect();
};

const disconnect = () => {
  socket.disconnect();
};

const joinRoom = (room: string) => {
  socket.emit('JoinRoom', room);
};

const sendMessage = (text: string) => {
  socket.emit('SendMessage', text);
};

const sendPrivateMessage = (text: string, to: string) => {
  socket.emit('SendPrivateMessage', text, to);
};

const updateOnline = (status: string) => {
  if (status === "connected") socket.emit('GetOnlineFriends');
  //TO DO:  // or in separate function?
  //if (status === "disconnected") socket.emit('AppearOfflineTo');
};

interface ClientToServerEvents {
  GetOnlineFriends:   () =>                         void;
  GetUsersInRoom:     (room: string) =>             void;
  JoinRoom:           (room: string) =>             void;
  RejoinRoom:         (room: string) =>             void;
  SendMessage:        (text: string) =>             void;
  SendPrivateMessage: (text: string, to: string) => void;
  //disconnecting
}

interface ServerToClientEvents {
  OnlineFriends:        (friends: string[]) =>             void;
  FriendCameOnline:     (friend: string) =>                void;
  FriendWentOffline:    (friend: string) =>                void;
  UsersInRoom:          (users: string[], room: string) => void;
  UsersInRoomRefetched: (users: string[], room: string) => void;
  UserJoinedRoom:       (user: string) =>                  void;
  UserLeftRoom:         (user: string) =>                  void;
  MessageSent:          (message: Message) =>              void;
  PrivateMessageSent:   (message: Message) =>              void;
  PrivateMessageFailed: (feedback: string) =>              void;
}

// *** TO DO: when they logout, disconnect them from chat (BOTH here and on backend redis)
