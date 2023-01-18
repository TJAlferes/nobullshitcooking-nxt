import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoaderSpinner } from '../../components';
import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { useTypedSelector as useSelector } from '../../store';
import { requestFriendship as userRequestFriendship } from '../../store/user/friendship/actions';
import { ProfileView } from './view';

export default function Profile(): JSX.Element {
  const router = useRouter();
  const username = router.query['username'] as string;

  const dispatch = useDispatch();
  const authname =            useSelector(state => state.auth.authname);
  const myFriendships =       useSelector(state => state.data.myFriendships);
  const theme =     useSelector(state => state.theme.theme);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const message =             useSelector(state => state.user.message);

  const [ clicked,    setClicked ] =    useState(false);
  const [ feedback,   setFeedback ] =   useState("");
  const [ loading,    setLoading ] =    useState(false);
  const [ tab,        setTab ] =        useState("public");
  const [ userAvatar, setUserAvatar ] = useState("nobsc-user-default");
  const [ userFavoriteRecipes, setUserFavoriteRecipes ] = useState([]);
  const [ userPublicRecipes,   setUserPublicRecipes ] =   useState([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  useEffect(() => {
    if (!username) {
      router.push('/home');
      return;
    }

    if ((username.length < 6) || (username.length > 20)) {
      router.push('/home');
      return;
    }

    // TO DO: WHAT HAPPENS IF THE USER IS NOT FOUND?

    const getUserProfile = async (username: string) => {
      const trimmed = username.trim();  // already done?
      const res = await axios.get(`${endpoint}/user/profile/${trimmed}`);

      if (res.data.avatar !== "nobsc-user-default") setUserAvatar(trimmed);  // change, use avatar from server
      setUserFavoriteRecipes(res.data.favoriteRecipes);
      setUserPublicRecipes(res.data.publicRecipes);
    };

    getUserProfile(username);
  }, []);

  const requestFriendship = () => {
    if (!username) return;
    setClicked(true);
    setLoading(true);
    dispatch(userRequestFriendship(username));
  };

  const changeTab = (value: string) => setTab(value);

  return !username
    ? <LoaderSpinner />
    : (
      <ProfileView
        authname={authname}
        clicked={clicked}
        myFriendships={myFriendships}
        feedback={feedback}
        requestFriendship={requestFriendship}
        changeTab={changeTab}
        userIsAuthenticated={userIsAuthenticated}
        loading={loading}
        theme={theme}
        tab={tab}
        userAvatar={userAvatar}
        username={username}
        userPublicRecipes={userPublicRecipes}
        userFavoriteRecipes={userFavoriteRecipes}
      />
    );
}