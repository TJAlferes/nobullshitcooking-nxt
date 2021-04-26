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

export default function Friends({ twoColumnATheme }: Props): JSX.Element {
  const dispatch = useDispatch();

  const authname = useSelector(state => state.auth.authname);
  const myFriendships = useSelector(state => state.data.myFriendships);
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

  const handleAcceptClick = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userAcceptFriendship((e.target as HTMLInputElement).value));
  };

  const handleBlockClick = () => {
    if (loading) return;
    if (!validateUserToFind()) return;
    const friendName = userToFind.trim();
    if (friendName === authname) return;
    setLoading(true);
    dispatch(userBlockUser(friendName));
    setUsertoFind("");
  };

  const handleDeleteClick = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userDeleteFriendship((e.target as HTMLInputElement).value));
  };

  const handleInputChange = (e: React.SyntheticEvent<EventTarget>) => {
    setUsertoFind((e.target as HTMLInputElement).value);
  };

  const handleRejectClick = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userRejectFriendship((e.target as HTMLInputElement).value));
  };

  const handleRequestClick = () => {
    if (loading) return;
    if (!validateUserToFind()) return;
    const friendName = userToFind.trim();
    if (friendName === authname) return;
    setLoading(true);
    dispatch(userRequestFriendship(friendName));
    setUsertoFind("");
  };

  const handleTabChange = (value: string) => setTab(value);

  const handleUnblockClick = (e: React.SyntheticEvent<EventTarget>) => {
    setLoading(true);
    dispatch(userUnblockUser((e.target as HTMLInputElement).value));
  };

  const validateUserToFind = () => (userToFind.trim()).length > 1;

  return (
    <FriendsView
      myFriendships={myFriendships}
      feedback={feedback}
      handleAcceptClick={handleAcceptClick}
      handleBlockClick={handleBlockClick}
      handleDeleteClick={handleDeleteClick}
      handleInputChange={handleInputChange}
      handleRejectClick={handleRejectClick}
      handleRequestClick={handleRequestClick}
      handleTabChange={handleTabChange}
      handleUnblockClick={handleUnblockClick}
      loading={loading}
      tab={tab}
      twoColumnATheme={twoColumnATheme}
      userToFind={userToFind}
    />
  );
};

type Props = {
  twoColumnATheme: string;
};