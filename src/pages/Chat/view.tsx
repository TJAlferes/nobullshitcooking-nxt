import { IMessageWithClientTimestamp } from '../../store/chat/types';
import { MessagesView } from './MessagesView';
import { OptionsView } from './OptionsView';
import { PeopleView } from './PeopleView';

export function ChatView({
  authname,
  changeMessageInput,
  changeMobileTab,
  changePeopleTab,
  changeRoom,
  changeRoomInput,
  connect,
  disconnect,
  feedback,
  focusedFriend,
  focusFriend,
  focusedUser,
  focusUser,
  loading,
  messages,
  messagesRef,
  messageToSend,
  mobileTab,
  onlineFriends,
  peopleTab,
  room,
  roomToEnter,
  sendMessage,
  startPrivateMessage,
  status,
  theme,
  users
}: Props): JSX.Element {
  const MobileTab = ({ tab }: MobileTabProps) => (
    <button
      className={
        mobileTab === tab ? "chat-mobile-tab--current" : "chat-mobile-tab"
      }
      onClick={() => changeMobileTab(tab)}
    >
      {tab}
    </button>
  );

  return (
    <div className={`chat two-col-a ${theme}`}>
      <div className="chat-desktop">
        <h1>Chat</h1>

        <p className="feedback">{feedback}</p>

        <OptionsView
          changeRoom={changeRoom}
          changeRoomInput={changeRoomInput}
          connect={connect}
          disconnect={disconnect}
          loading={loading}
          room={room}
          roomToEnter={roomToEnter}
          status={status}
        />

        <div className="chat-main">
          <MessagesView
            authname={authname}
            changeMessageInput={changeMessageInput}
            messages={messages}
            messagesRef={messagesRef}
            messageToSend={messageToSend}
            sendMessage={sendMessage}
            status={status}
          />

          <PeopleView
            changePeopleTab={changePeopleTab}
            focusedFriend={focusedFriend}
            focusFriend={focusFriend}
            focusedUser={focusedUser}
            focusUser={focusUser}
            onlineFriends={onlineFriends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        </div>
      </div>

      <div className="chat-mobile">
        <p className="feedback">{feedback}</p>

        <div className="chat-mobile-tabs">
          <MobileTab tab="Messages" />

          <MobileTab tab="People" />

          <MobileTab tab="Options" />
        </div>

        {mobileTab === "Options" && (
          <OptionsView
            changeRoom={changeRoom}
            changeRoomInput={changeRoomInput}
            connect={connect}
            disconnect={disconnect}
            loading={loading}
            room={room}
            roomToEnter={roomToEnter}
            status={status}
          />
        )}
        
        {mobileTab === "Messages" && (
          <MessagesView
            authname={authname}
            changeMessageInput={changeMessageInput}
            messages={messages}
            messagesRef={messagesRef}
            messageToSend={messageToSend}
            sendMessage={sendMessage}
            status={status}
          />
        )}

        {mobileTab === "People" && (
          <PeopleView
            changePeopleTab={changePeopleTab}
            focusedFriend={focusedFriend}
            focusFriend={focusFriend}
            focusedUser={focusedUser}
            focusUser={focusUser}
            onlineFriends={onlineFriends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

type Props = {
  authname: string;
  changeMessageInput(e: React.SyntheticEvent<EventTarget>): void;
  changeMobileTab(value: string): void;
  changePeopleTab(value: string): void;
  changeRoomInput(e: React.SyntheticEvent<EventTarget>): void;
  changeRoom(): void;
  connect(): void;
  disconnect(): void;
  feedback: string;
  focusedFriend: string | undefined;
  focusFriend(friend: string): void;
  focusedUser: string | undefined;
  focusUser(user: string): void;
  loading: boolean;
  messages: IMessageWithClientTimestamp[];
  messagesRef: React.RefObject<HTMLUListElement>;
  messageToSend: string;
  mobileTab: string;
  onlineFriends: string[];
  peopleTab: string;
  room: string;
  roomToEnter: string;
  sendMessage(e: React.KeyboardEvent): void;
  startPrivateMessage(username: string): void;
  status: string;
  theme: string;
  users: string[];
};

type MobileTabProps = {
  tab: string;
};