import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import {
  userAcceptFriendship,
  userBlockUser,
  userDeleteFriendship,
  userRejectFriendship,
  userRequestFriendship,
  userUnblockUser
} from '../../store/user/friendship/actions';
import { FriendsView } from './view';

export default function Friends(): JSX.Element {
  const dispatch = useDispatch();

  const authname = useSelector(state => state.auth.authname);
  const myFriendships = useSelector(state => state.data.myFriendships);
  const theme = useSelector(state => state.theme.theme);
  const message = useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ tab, setTab ] = useState("accepted");
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

  const acceptFriendship = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userAcceptFriendship((e.target as HTMLInputElement).value));
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

  const deleteFriendship = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userDeleteFriendship((e.target as HTMLInputElement).value));
  };

  const inputChange = (e: React.SyntheticEvent<EventTarget>) => {
    setUsertoFind((e.target as HTMLInputElement).value);
  };

  const rejectFriendship = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userRejectFriendship((e.target as HTMLInputElement).value));
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

  const unblockUser = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userUnblockUser((e.target as HTMLInputElement).value));
  };

  const validateUserToFind = () => (userToFind.trim()).length > 1;

  return (
    <FriendsView
      myFriendships={myFriendships}
      feedback={feedback}
      acceptFriendship={acceptFriendship}
      blockUser={blockUser}
      deleteFriendship={deleteFriendship}
      inputChange={inputChange}
      rejectFriendship={rejectFriendship}
      requestFriendship={requestFriendship}
      tabChange={tabChange}
      unblockUser={unblockUser}
      loading={loading}
      tab={tab}
      theme={theme}
      userToFind={userToFind}
    />
  );
};