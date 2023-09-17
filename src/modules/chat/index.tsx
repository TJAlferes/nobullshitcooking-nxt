import { useEffect, useReducer, useRef, useState } from 'react';

import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../redux';
import {
  connect as chatConnect,
  disconnect as chatDisconnect,
  joinRoom,
  sendMessage,
  sendPrivateMessage
} from './state';
import type { MessageWithClientTimestamp } from './state';
import { useAuthname } from '../auth';

// TO DO: fix no longer auto scrolling after spam debounce
export default function Chat() {
  const dispatch = useDispatch();
  const authname = useAuthname();

  // TO DO: chat useReducer and useChat (useContext(ChatContext))
  const [ chat, dispatch ] = useReducer();
  const connected     = useSelector(state => state.chat.connected);
  const room          = useSelector(state => state.chat.room);
  const messages      = useSelector(state => state.chat.messages);
  const friends       = useSelector(state => state.chat.friends);
  const users         = useSelector(state => state.chat.users);

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

  const url = "https://s3.amazonaws.com/nobsc-user-avatars";

  useEffect(() => {
    let mounted = false;
    if (mounted) {
      setupChat(store);
    }
    return () => {
      mounted = true;
    };
  }, []);
  
  window.onblur = function() {
    setWindowFocused(false);
  };

  window.onfocus = function() {
    const favicon = document.getElementById('nobsc-favicon') as HTMLLinkElement | null;
    if (!favicon) return;
    favicon.href = "/nobsc-normal-favicon.png";
    setWindowFocused(true);
  };

  useEffect(() => {
    const setAlertFavicon = () => {
      const nobscFavicon = document.getElementById('nobsc-favicon') as HTMLLinkElement;
      nobscFavicon.href = "/icons/alert.png";
    };

    const autoScroll = () => {  // TO DO: fix no longer auto scrolling after spam debounce
      if (!messagesRef || !messagesRef.current) return;

      const newestMessage: HTMLUListElement = messagesRef.current.lastElementChild as HTMLUListElement;
      if (!newestMessage) return;

      const containerHeight = messagesRef.current.scrollHeight;

      const newestMessageHeight =
        newestMessage.offsetHeight
        + parseInt(getComputedStyle(newestMessage).marginBottom);

      const scrollOffset =
        messagesRef.current.scrollTop
        + messagesRef.current.offsetHeight;

      // cancels autoscroll if user is scrolling up through older messages
      if ((containerHeight - newestMessageHeight) <= scrollOffset) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    if (!windowFocused) setAlertFavicon();
    autoScroll();
  }, [messages]);

  const changeRoomInput = (e: SyntheticEvent) =>
    setRoomToEnter((e.target as HTMLInputElement).value.trim());

  const changeMessageInput = (e: SyntheticEvent) =>
    setMessageToSend((e.target as HTMLInputElement).value.trim());
  
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

  const connect = () => {
    setLoading(true);
    dispatch(chatConnect());
    setLoading(false);
  };

  const disconnect = () => {
    setLoading(true);
    dispatch(chatDisconnect());
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
    /*else if (currentFriend !== "") {const trimmedFriend = currentFriend.trim();messengerSendWhisper(trim, trimmedFriend);}*/
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

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
