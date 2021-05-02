import { IMessageWithClientTimestamp, IUser } from '../../store/chat/types';
import { MessagesView } from './MessagesView';
import { OptionsView } from './OptionsView';
import { PeopleView } from './PeopleView';

export function ChatView({
  authname,
  room,
  feedback,
  focusedFriend,
  focusedUser,
  changeRoom,
  connect,
  disconnect,
  focusFriend,
  changeMessageInput,
  sendMessage,
  changeMobileTab,
  changePeopleTab,
  changeRoomInput,
  focusUser,
  loading,
  messages,
  messagesRef,
  messageToSend,
  mobileTab,
  onlineFriends,
  peopleTab,
  roomToEnter,
  startPrivateMessage,
  status,
  twoColumnATheme,
  users
}: Props): JSX.Element {
  const Tab = ({ tab }: TabProps) => (
    <button
      className={
        (mobileTab === tab) ? "chat__mobile-tab--current" : "chat__mobile-tab"
      }
      onClick={() => changeMobileTab(tab)}
    >
      {tab}
    </button>
  );

  return (
    <div className={`chat two-column-a ${twoColumnATheme}`}>
      <div className="chat__desktop">
        <h1>Chat</h1>

        <p className="feedback">{feedback}</p>

        <OptionsView
          room={room}
          changeRoom={changeRoom}
          connect={connect}
          disconnect={disconnect}
          changeRoomInput={changeRoomInput}
          loading={loading}
          roomToEnter={roomToEnter}
          status={status}
        />

        <div className="chat__main">
          <MessagesView
            authname={authname}
            changeMessageInput={changeMessageInput}
            sendMessage={sendMessage}
            messages={messages}
            messagesRef={messagesRef}
            messageToSend={messageToSend}
            status={status}
          />

          <PeopleView
            focusedFriend={focusedFriend}
            focusedUser={focusedUser}
            focusFriend={focusFriend}
            changePeopleTab={changePeopleTab}
            focusUser={focusUser}
            onlineFriends={onlineFriends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        </div>
      </div>

      <div className="chat__mobile">
        <p className="feedback">{feedback}</p>

        <div className="chat__mobile-tabs">
          <Tab tab="Messages" />

          <Tab tab="People" />

          <Tab tab="Options" />
        </div>

        {mobileTab === "Options" && (
          <OptionsView
            room={room}
            changeRoom={changeRoom}
            connect={connect}
            disconnect={disconnect}
            changeRoomInput={changeRoomInput}
            loading={loading}
            roomToEnter={roomToEnter}
            status={status}
          />
        )}
        
        {mobileTab === "Messages" && (
          <MessagesView
            authname={authname}
            changeMessageInput={changeMessageInput}
            sendMessage={sendMessage}
            messages={messages}
            messagesRef={messagesRef}
            messageToSend={messageToSend}
            status={status}
          />
        )}

        {mobileTab === "People" && (
          <PeopleView
            focusedFriend={focusedFriend}
            focusedUser={focusedUser}
            focusFriend={focusFriend}
            changePeopleTab={changePeopleTab}
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
  room: string;
  feedback: string;
  focusedFriend: string | null;
  focusedUser: string | null;
  changeRoom(): void;
  connect(): void;
  disconnect(): void;
  focusFriend(friend: string): void;
  changeMessageInput(e: React.SyntheticEvent<EventTarget>): void;
  sendMessage(e: React.KeyboardEvent): void;
  changeMobileTab(value: string): void;
  changePeopleTab(value: string): void;
  changeRoomInput(e: React.SyntheticEvent<EventTarget>): void;
  focusUser(user: string): void;
  loading: boolean;
  messages: IMessageWithClientTimestamp[];
  messagesRef: React.RefObject<HTMLUListElement>;
  messageToSend: string;
  mobileTab: string;
  onlineFriends: IUser[];
  peopleTab: string;
  roomToEnter: string;
  startPrivateMessage(username: string): void;
  status: string;
  twoColumnATheme: string;
  users: IUser[];
};

type TabProps = {
  tab: string;
};