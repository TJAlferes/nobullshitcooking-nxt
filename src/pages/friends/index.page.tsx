import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import {
  acceptFriendship  as userAcceptFriendship,
  blockUser         as userBlockUser,
  deleteFriendship  as userDeleteFriendship,
  rejectFriendship  as userRejectFriendship,
  requestFriendship as userRequestFriendship,
  unblockUser       as userUnblockUser
} from '../../store/user/friendship/actions';
import { FriendsView } from './view';

export default function Friends() {
  const dispatch = useDispatch();
  const authname =      useSelector(state => state.auth.authname);
  const myFriendships = useSelector(state => state.data.myFriendships);
  const message =       useSelector(state => state.user.message);

  const [ feedback,   setFeedback ] =   useState("");
  const [ loading,    setLoading ] =    useState(false);
  const [ tab,        setTab ] =        useState("accepted");
  const [ userToFind, setUsertoFind ] = useState("");

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

  const acceptFriendship = (name: string) => {
    setLoading(true);
    dispatch(userAcceptFriendship(name));
  };

  const blockUser = () => {
    if (loading) return;
    if (!validateUserToFind()) return;
    const friendName = userToFind.trim();
    if (friendName === authname) return;
    setLoading(true);
    dispatch(userBlockUser(friendName));
    setUsertoFind("");
  };

  const deleteFriendship = (name: string) => {
    setLoading(true);
    dispatch(userDeleteFriendship(name));
  };

  const inputChange = (e: SyntheticEvent) => setUsertoFind((e.target as HTMLInputElement).value);

  const rejectFriendship = (name: string) => {
    setLoading(true);
    dispatch(userRejectFriendship(name));
  };

  const requestFriendship = () => {
    if (loading) return;
    if (!validateUserToFind()) return;
    const friendName = userToFind.trim();
    if (friendName === authname) return;
    setLoading(true);
    dispatch(userRequestFriendship(friendName));
    setUsertoFind("");
  };

  const tabChange = (value: string) => setTab(value);

  const unblockUser = (name: string) => {
    setLoading(true);
    dispatch(userUnblockUser(name));
  };

  const validateUserToFind = () => (userToFind.trim()).length > 1;

  return (
    <FriendsView
      acceptFriendship={acceptFriendship}
      blockUser={blockUser}
      deleteFriendship={deleteFriendship}
      feedback={feedback}
      inputChange={inputChange}
      loading={loading}
      myFriendships={myFriendships}
      rejectFriendship={rejectFriendship}
      requestFriendship={requestFriendship}
      tab={tab}
      tabChange={tabChange}
      unblockUser={unblockUser}
      userToFind={userToFind}
    />
  );
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
