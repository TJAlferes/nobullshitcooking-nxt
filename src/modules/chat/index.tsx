/*import axios                           from 'axios';
import { useEffect, useRef, useState } from 'react';

import { endpoint }         from '../../config/api';
import { useAuth, useChat } from '../../store';
import { getSocket }        from './socket';

export default function Chat() {
  const socket = getSocket();
  const { authname } = useAuth();
  const {
    connected,
    setConnected,

    current_private_conversation,
    setCurrentPrivateConversation,
    private_conversations,
    setPrivateConversations,
    private_chatmessages,
    setPrivateChatMessages,

    current_chatgroup,
    setCurrentChatgroup,
    chatgroups,
    setChatgroups,
    chatgroup_users,
    setChatgroupUsers,

    current_chatroom,
    setCurrentChatroom,
    chatrooms,
    setChatrooms,
    chatroom_users,
    setChatroomUsers,
    chatmessages,
    setChatmessages
  } = useChat();
  
  const [ feedback,      setFeedback ]      = useState("");
  const [ windowFocused, setWindowFocused ] = useState(true);
  const [ loading,       setLoading ]       = useState(false);
  const [ debounced,     setDebounced ]     = useState(false);
  const [ spamCount,     setSpamCount ]     = useState(1);
  const [ peopleTab,     setPeopleTab ]     = useState("Room");
  const [ focusedFriend, setFocusedFriend ] = useState<string>();
  const [ focusedUser,   setFocusedUser ]   = useState<string>();
  const [ roomToEnter,   setRoomToEnter ]   = useState("");
  const [ messageToSend, setMessageToSend ] = useState("");

  const messagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    function onReconnect() {
      if (current_chatgroup) {
        socket.emit('RejoinGroup', current_chatgroup);  // should also get the users
      }
      if (current_chatroom) {
        socket.emit('RejoinRoom', current_chatroom);  // should also get the users
      }
    }

    function onFooEvent(value) {
      
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.io.on('reconnect', onReconnect);
    socket.on('OnlineFriends', (friends) => onlineFriends(friends));
    socket.on('FriendCameOnline', (friend) => friendCameOnline(friend));
    socket.on('FriendWentOffline', (friend) => friendWentOffline(friend));
    socket.on('UsersInRoom', (users, room) => joinedRoom(users, room));
    socket.on('UsersInRoomRefetched', (users, room) => rejoinedRoom(users, room));
    socket.on('UserJoinedRoom', (user) => userJoinedRoom(user));
    socket.on('UserLeftRoom', (user) => userLeftRoom(user));
    socket.on('Message', (message) => receivedMessage(message));
    socket.on('PrivateMessage', (message) => receivedPrivateMessage(message));
    socket.on('FailedPrivateMessage', (feedback) => failedPrivateMessage(feedback));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.io.off('reconnect', onReconnect);
      //socket.off;
    };
  }, [socket]);

  useEffect(() => {
    function onBlur() {
      setWindowFocused(false);
    }
  
    function onFocus() {
      const favicon = document.getElementById('nobsc-favicon') as HTMLLinkElement;
      favicon.href = "/nobsc-normal-favicon.png";
      setWindowFocused(true);
    }
  
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    function autoScroll() {  // TO DO: fix no longer auto scrolling after spam debounce
      if (!messagesRef || !messagesRef.current) return;

      const newestMessage = messagesRef.current.lastElementChild as HTMLUListElement;
      if (!newestMessage) return;

      const containerHeight = messagesRef.current.scrollHeight;

      const newestMessageHeight = newestMessage.offsetHeight +
        parseInt(getComputedStyle(newestMessage).marginBottom);

      const scrollOffset = messagesRef.current.scrollTop +
        messagesRef.current.offsetHeight;

      // cancels autoscroll if user is scrolling up through older messages
      if ((containerHeight - newestMessageHeight) <= scrollOffset) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }

    if (!windowFocused) {
      const nobscFavicon = document.getElementById('nobsc-favicon') as HTMLLinkElement;
      nobscFavicon.href = "/icons/alert.png";
    }
    autoScroll();
  }, [messages]);

  const connect = () => socket.connect();

  const disconnect = () => socket.disconnect();

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

  const changeRoomInput = (e: ChangeEvent) => setRoomToEnter(e.target.value.trim());

  const changeMessageInput = (e: ChangeEvent) => setMessageToSend(e.target.value.trim());
  
  const changePeopleTab = (value: string) => setPeopleTab(value);
  
  const changeRoom = () => {
    if (loading) return;

    if (debounced) {
      setFeedback("Slow down there partner...");
      setTimeout(() => setFeedback(""), 6000);
      return;
    }

    const trimmedRoom = roomToEnter.trim();
    if (trimmedRoom.length < 1 || trimmedRoom === "") return;
    if (trimmedRoom.length > 20) {
      setFeedback("Please limit room name length to 20 characters.");
      setTimeout(() => setFeedback(""), 4000);
      return;
    }

    setLoading(true);
    //setCurrentFriend("");
    dispatch(joinRoom(trimmedRoom));
    setRoomToEnter("");
    preventSpam();
    setLoading(false);
  };

  const focusFriend = (friend: string) => setFocusedFriend(friend);

  const focusUser = (user: string) => user !== authname && setFocusedUser(user);

  const preventSpam = () => {
    setSpamCount(prev => prev + 1);
    setTimeout(() => setSpamCount(prev => prev - 1), 2000);
    if (spamCount > 2) {
      setDebounced(true);
      setTimeout(() => setDebounced(false), 6000);
    }
  };
  
  const send = (e: React.KeyboardEvent) => {  // TO DO: improve this
    // TO DO: move into (?)
    if (e.key && (e.key !== "Enter")) return;
    if (loading) return;
    if (debounced) {
      setFeedback("Slow down there partner...");
      setTimeout(() => setFeedback(""), 6000);
      return;
    }

    const trim = messageToSend.trim();
    if (trim.length < 1 || trim === "") return;
    if (trim.length > 4000) {
      setFeedback("Please limit message length to 4,000 characters.");
      setTimeout(() => setFeedback(""), 4000);
      return;
    }

    setLoading(true);
    const whispering = trim.slice(0, 3) === "/w ";
    if (whispering) {
      // TO DO: MESS AROUND AGAIN WITH "WRONG" WHITESPACES, if return here, or clean
      const whisper = trim.replace(/^([\S]+\s){2}/, '');
      const to =      trim.match(/^(\S+? \S+?) ([\s\S]+?)$/);
      if (!(to && to[1])) return;

      const trimmedTo = to[1].substring(3);
      dispatch(sendPrivateMessage(whisper, trimmedTo));
    }
    else dispatch(sendMessage(trim));
    //else if (currentFriend !== "") {const trimmedFriend = currentFriend.trim();messengerSendWhisper(trim, trimmedFriend);}
    setMessageToSend("");
    preventSpam();
    setLoading(false);
  };

  const startPrivateMessage = (username: string) => {
    setFocusedFriend(undefined);
    setFocusedUser(undefined);
    setMessageToSend(`/w ${username}`);
  };

  const sortedUsers = users.sort((a, b) => {  // sorts yourself first, then others alphabetically
    if (a === authname) return -1;
    if (b === authname) return 1;
    if (a < b)          return -1;
    return a > b ? 1 : 0;
  });

  return (
    <div className="one-col chat">
      <div className="chat-desktop">
        <h1>Chat</h1>

        <p className="feedback">{feedback}</p>

        <div className="chat-options">
          <button
            disabled={loading}
            onClick={connected ? disconnect : connect}
          >
            {connected ? "Disconnect" : "Connect"}
          </button>

          <div className="chatgroups">
            <h2>Chatgroups</h2>
            
            {chatgroups.map(c => (
              <div className="chatgroup" key={c.chatgroup_id}>
                {c.chatgroup_name}
              </div>
            ))}
          </div>

          <div className="current-room">
            <label>Current Room:</label><span>{room}</span>
          </div>

          <div className="change-room">
            <label>Go To Room:</label>

            <input
              disabled={!connected || loading}
              name="change-room-input"
              onChange={changeRoomInput}
              type="text"
              value={roomToEnter}
            />

            <button
              disabled={!connected || loading}
              onClick={changeRoom}
            >Enter</button>
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-messages">
            <ul ref={messagesRef}>
              {messages && messages.map(message => (
                <li key={message.id}>
                  <span className="message-ts">{message.ts}{' '}</span>
                  {formattedMessage(authname, message)}
                </li>
              ))}
            </ul>

            <input
              disabled={!connected}
              name="chat-input"
              onChange={changeMessageInput}
              onKeyUp={e => send(e)}
              type="text"
              value={messageToSend}
            />
          </div>

          <div className="chat-people">
            <div className="people-tabs">
              <button
                className={peopleTab === "Room" ? "--current" : ""}
                onClick={() => changePeopleTab("Room")}
              >Room</button>

              <button
                className={peopleTab === "Friends" ? "--current" : ""}
                onClick={() => changePeopleTab("Friends")}
              >Friends</button>
            </div>

            {peopleTab === "Room" && (
              <ul className="chat-persons">
                {users && users.map(user => (
                  <li
                    className="chat-person"
                    key={user}
                    onClick={() => focusUser(user)}
                  >
                    <img src={`${url}/${user}-tiny`} />

                    <span>{user}</span>

                    {focusedUser && focusedUser === user && (
                      <div className="person-tooltip">
                        <button onClick={() => startPrivateMessage(user)}>
                          Whisper
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {peopleTab === "Friends" && (
              <ul className="chat-persons">
                {friends && friends.map(friend => (
                  <li
                    className="chat-person"
                    key={friend}
                    onClick={() => focusFriend(friend)}
                  >
                    <img src={`${url}/${friend}-tiny`} />

                    <span>{friend}</span>

                    {focusedFriend && focusedFriend === friend && (
                      <div className="person-tooltip">
                        <button onClick={() => startPrivateMessage(friend)}>
                          Whisper
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// TO DO: use as a component <FormattedMessage authname="" message={} />
function formattedMessage(authname: string, { kind, from, to, text }: MessageWithClientTimestamp) {
  if (kind === "public") {
    if (from === "messengerstatus") {
      return <span className="--admin">{text}</span>;
    }  // status

    if (from === authname) {
      return <><span className="--self">{from}:{' '}</span>{text}</>;
    }  // sent

    return <><span className="--other">{from}:{' '}</span>{text}</>;  // received
  }

  if (from === authname) {
    return (
      <>
        <span className="--self">You whisper to{' '}{to}:{' '}</span>
        <span className="--private">{text}</span>
      </>
    );  // sent
  }

  return (
    <>
      <span className="--other">{from}{' '}whispers to you:{' '}</span>
      <span className="--private">{text}</span>
    </>
  );  // received
};

// TO DO: you can still localize here, but let database create the timestamps
function getTime(time: Date) {
  return `${time.toLocaleTimeString()}`;
}

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
*/