import React from 'react';

import { LeftNav } from '../../components';
import { IMessageWithClientTimestamp, IUser } from '../../store/chat/types';
import { MessagesView } from './MessagesView/MessagesView';
import { OptionsView } from './OptionsView/OptionsView';
import { PeopleView } from './PeopleView/PeopleView';
import './chat.css';

export function ChatView({
  authname,
  room,
  feedback,
  focusedFriend,
  focusedUser,
  handleRoomChange,
  handleConnect,
  handleDisconnect,
  handleFriendClick,
  handleMessageInputChange,
  handleMessageSend,
  handlePeopleTabChange,
  handleRoomInputChange,
  handleUserClick,
  loading,
  messages,
  messagesRef,
  messageToSend,
  onlineFriends,
  peopleTab,
  roomToEnter,
  startPrivateMessage,
  status,
  twoColumnATheme,
  users
}: Props): JSX.Element {
  return (
    <div className={`chat two-column-a ${twoColumnATheme}`}>
      <LeftNav />

      <section>
        <h1>Chat</h1>

        <p className="chat__feedback">{feedback}</p>

        <OptionsView
          room={room}
          handleRoomChange={handleRoomChange}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
          handleRoomInputChange={handleRoomInputChange}
          loading={loading}
          roomToEnter={roomToEnter}
          status={status}
        />

        <div className="chat__main">
          <MessagesView
            authname={authname}
            handleMessageInputChange={handleMessageInputChange}
            handleMessageSend={handleMessageSend}
            messages={messages}
            messagesRef={messagesRef}
            messageToSend={messageToSend}
            status={status}
          />

          <PeopleView
            focusedFriend={focusedFriend}
            focusedUser={focusedUser}
            handleFriendClick={handleFriendClick}
            handlePeopleTabChange={handlePeopleTabChange}
            handleUserClick={handleUserClick}
            onlineFriends={onlineFriends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        </div>
      </section>
    </div>
  );
}

type Props = {
  authname: string;
  room: string;
  feedback: string;
  focusedFriend: string | null;
  focusedUser: string | null;
  handleRoomChange(): void;
  handleConnect(): void;
  handleDisconnect(): void;
  handleFriendClick(friend: string): void;
  handleMessageInputChange(e: React.SyntheticEvent<EventTarget>): void;
  handleMessageSend(e: React.KeyboardEvent): void;
  handlePeopleTabChange(value: string): void;
  handleRoomInputChange(e: React.SyntheticEvent<EventTarget>): void;
  handleUserClick(user: string): void;
  loading: boolean;
  messages: IMessageWithClientTimestamp[];
  messagesRef: React.RefObject<HTMLUListElement>;
  messageToSend: string;
  onlineFriends: IUser[];
  peopleTab: string;
  roomToEnter: string;
  startPrivateMessage(username: string): void;
  status: string;
  twoColumnATheme: string;
  users: IUser[];
};