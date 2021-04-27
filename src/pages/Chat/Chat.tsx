import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import {
  chatChangeRoom,
  chatConnect,
  chatDisconnect,
  chatSendPrivateMessage,
  chatSendPublicMessage
} from '../../store/chat/actions';
import { ChatView } from './view';

// TO DO: fix no longer auto scrolling after spam debounce

export default function Chat(): JSX.Element {
  const dispatch = useDispatch();
  // would it make sense to move some of this down in the component tree?
  const authname = useSelector(state => state.auth.authname);
  const room = useSelector(state => state.chat.room);
  const message = useSelector(state => state.user.message);
  const messages = useSelector(state => state.chat.messages);
  const onlineFriends = useSelector(state => state.chat.onlineFriends);
  const status = useSelector(state => state.chat.status);
  const twoColumnATheme = useSelector(state => state.theme.twoColumnATheme);
  const users = useSelector(state => state.chat.users);
  const windowFocused = useSelector(state => state.nobscapp.windowFocused);

  const [ debounced, setDebounced ] = useState(false);
  const [ feedback, setFeedback ] = useState("");
  const [ focusedFriend, setFocusedFriend ] = useState<string | null>(null);
  const [ focusedUser, setFocusedUser ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ messageToSend, setMessageToSend ] = useState("");
  const [ peopleTab, setPeopleTab ] = useState("Room");
  const [ roomToEnter, setRoomToEnter ] = useState("");
  const [ spamCount, setSpamCount ] = useState(1);

  const messagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  useEffect(() => {
    const setAlertFavicon = () => {
      const nobscFavicon =
        document.getElementById('nobsc-favicon') as HTMLLinkElement;
      nobscFavicon.href = "/alert.png";
    };

    // TO DO: fix no longer auto scrolling after spam debounce
    const autoScroll = () => {
      if (!messagesRef || !messagesRef.current) return;

      const newestMessage: HTMLUListElement =
        messagesRef.current.lastElementChild as HTMLUListElement;
      
      if (!newestMessage) return;

      const containerHeight = messagesRef.current.scrollHeight;

      const newestMessageHeight =
        newestMessage.offsetHeight +
        parseInt(getComputedStyle(newestMessage).marginBottom);

      const scrollOffset =
        messagesRef.current.scrollTop +
        messagesRef.current.offsetHeight;

      // cancels autoscroll if user is scrolling up through older messages
      if ((containerHeight - newestMessageHeight) <= scrollOffset) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    if (windowFocused === false) setAlertFavicon();

    autoScroll();
  }, [messages]);

  const handleRoomChange = () => {
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
    dispatch(chatChangeRoom(trimmedRoom));
    setRoomToEnter("");
    preventSpam();
    setLoading(false);
  };

  const handleConnect = () => {
    setLoading(true);
    dispatch(chatConnect());
    setLoading(false);
  };

  const handleDisconnect = () => {
    setLoading(true);
    dispatch(chatDisconnect());
    setLoading(false);
  };

  const handleFriendClick = (friend: string) => setFocusedFriend(friend);

  const handleMessageInputChange = (e: React.SyntheticEvent<EventTarget>) =>
    setMessageToSend((e.target as HTMLInputElement).value.trim());

  // TO DO: improve this
  const handleMessageSend = (e: React.KeyboardEvent) => {
    // TO DO: move into 
    if (e.key && (e.key !== "Enter")) return;
    if (loading) return;
    if (debounced) {
      setFeedback("Slow down there partner...");
      setTimeout(() => setFeedback(""), 6000);
      return;
    }

    const trimmedMessage = messageToSend.trim();
    if (trimmedMessage.length < 1 || trimmedMessage === "") return;
    if (trimmedMessage.length > 4000) {
      setFeedback("Please limit message length to 4,000 characters.");
      setTimeout(() => setFeedback(""), 4000);
      return;
    }

    setLoading(true);

    const whispering = trimmedMessage.slice(0, 3) === "/w ";
    if (whispering) {
      // TO DO: MESS AROUND AGAIN WITH "WRONG" WHITESPACES, if return here, or clean
      const trimmedWhisper = trimmedMessage.replace(/^([\S]+\s){2}/, '');
      const userToWhisper = trimmedMessage.match(/^(\S+? \S+?) ([\s\S]+?)$/);

      if (!userToWhisper) return;

      const trimmedUserToWhisper = userToWhisper[1].substring(3);

      dispatch(chatSendPrivateMessage(trimmedWhisper, trimmedUserToWhisper));
    } else {
      dispatch(chatSendPublicMessage(trimmedMessage));
    }
    /*else if (currentFriend !== "") {
      const trimmedFriend = currentFriend.trim();
      messengerSendWhisper(trimmedMessage, trimmedFriend);
    }*/

    setMessageToSend("");
    preventSpam();
    setLoading(false);
  };

  const handlePeopleTabChange = (value: string) => setPeopleTab(value);

  const handleRoomInputChange = (e: React.SyntheticEvent<EventTarget>) =>
    setRoomToEnter((e.target as HTMLInputElement).value.trim());

  const handleUserClick = (user: string) =>
    user !== authname && setFocusedUser(user);
  
  const preventSpam = () => {
    setSpamCount(prev => prev + 1);
    setTimeout(() => setSpamCount(prev => prev - 1), 2000);
    if (spamCount > 2) {
      setDebounced(true);
      setTimeout(() => setDebounced(false), 6000);
    }
  };

  const startPrivateMessage = (username: string) => {
    setFocusedFriend(null);
    setFocusedUser(null);
    setMessageToSend(`/w ${username}`);
  };

  return (
    <ChatView
      authname={authname}
      room={room}
      feedback={feedback}
      focusedFriend={focusedFriend}
      focusedUser={focusedUser}
      handleRoomChange={handleRoomChange}
      handleConnect={handleConnect}
      handleDisconnect={handleDisconnect}
      handleFriendClick={handleFriendClick}
      handleMessageInputChange={handleMessageInputChange}
      handleMessageSend={handleMessageSend}
      handlePeopleTabChange={handlePeopleTabChange}
      handleRoomInputChange={handleRoomInputChange}
      handleUserClick={handleUserClick}
      loading={loading}
      messages={messages}
      messagesRef={messagesRef}
      messageToSend={messageToSend}
      onlineFriends={onlineFriends}
      peopleTab={peopleTab}
      roomToEnter={roomToEnter}
      startPrivateMessage={startPrivateMessage}
      status={status}
      twoColumnATheme={twoColumnATheme}
      users={users}
    />
  );
}