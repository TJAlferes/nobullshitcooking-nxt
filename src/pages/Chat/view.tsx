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
  friends,
  peopleTab,
  room,
  roomToEnter,
  send,
  startPrivateMessage,
  status,
  theme,
  users
}: Props): JSX.Element {
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
            send={send}
            status={status}
          />

          <PeopleView
            changePeopleTab={changePeopleTab}
            focusedFriend={focusedFriend}
            focusFriend={focusFriend}
            focusedUser={focusedUser}
            focusUser={focusUser}
            friends={friends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        </div>
      </div>

      <div className="chat-mobile">
        <p className="feedback">{feedback}</p>

        <div className="chat-mobile-tabs">
          <button className={mobileTab === "Messages" ? "chat-mobile-tab--current" : "chat-mobile-tab"} onClick={() => changeMobileTab("Messages")}>Messages</button>
          <button className={mobileTab === "People" ? "chat-mobile-tab--current" : "chat-mobile-tab"} onClick={() => changeMobileTab("People")}>People</button>
          <button className={mobileTab === "Options" ? "chat-mobile-tab--current" : "chat-mobile-tab"} onClick={() => changeMobileTab("Options")}>Options</button>
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
            send={send}
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
            friends={friends}
            peopleTab={peopleTab}
            startPrivateMessage={startPrivateMessage}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  authname:                              string;
  changeMessageInput(e: SyntheticEvent): void;
  changeMobileTab(value: string):        void;
  changePeopleTab(value: string):        void;
  changeRoomInput(e: SyntheticEvent):    void;
  changeRoom():                          void;
  connect():                             void;
  disconnect():                          void;
  feedback:                              string;
  focusedFriend:                         string | undefined;
  focusFriend(friend: string):           void;
  focusedUser:                           string | undefined;
  focusUser(user: string):               void;
  loading:                               boolean;
  messages:                              IMessageWithClientTimestamp[];
  messagesRef:                           React.RefObject<HTMLUListElement>;
  messageToSend:                         string;
  mobileTab:                             string;
  friends:                               string[];
  peopleTab:                             string;
  room:                                  string;
  roomToEnter:                           string;
  send(e: React.KeyboardEvent):          void;
  startPrivateMessage(username: string): void;
  status:                                string;
  theme:                                 string;
  users:                                 string[];
};