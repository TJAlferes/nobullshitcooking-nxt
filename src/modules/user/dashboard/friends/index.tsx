import axios                   from 'axios';
import Link                    from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { endpoint }                        from '../../../../config/api';
import { getMyFriendshipsWorker }          from '../../data/network';  // TO DO: more proper to put action, and then invoke worker from watcher
import { useTypedSelector as useSelector } from '../../../../redux';

// Just make this a Dashboard tab ???
export default function Friends() {
  const dispatch = useDispatch();
  const authname =       useSelector(state => state.authentication.authname);
  const my_friendships = useSelector(state => state.userData.my_friendships);
  const message =        useSelector(state => state.system.message);

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

  const requestFriendship = async () => {
    if (loading) return;
    if (!validateUserToFind()) return;

    const friendname = userToFind.trim();
    if (friendname === authname) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${endpoint}/users/${authname}/friendships`,
        {friendname},
        {withCredentials: true}
      );

      setFeedback(data.message);
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
    setUsertoFind("");
  };

  const acceptFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${endpoint}/users/${authname}/friendships/${friendname}`,
        {status: "accept"},
        {withCredentials: true}
      );

      setFeedback(data.message);
      //dispatch(getMyFriendships());
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
  };

  /*const rejectFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${endpoint}/users/${authname}/friendships/${friendname}`,
        {status: "reject"},
        {withCredentials: true}
      );  // axios.delete ???

      setFeedback(data.message);
      //dispatch(getMyFriendships());
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
  };*/

  // also used for rejecting??? also used for unblocking???
  const deleteFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${authname}/friendships/${friendname}`,
        {withCredentials: true}
      );

      setFeedback(data.message);
      //dispatch(getMyFriendships());
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
  };

  const blockUser = async () => {
    if (loading) return;
    if (!validateUserToFind()) return;

    const friendname = userToFind.trim();
    if (friendname === authname) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${endpoint}/users/${authname}/friendships/${friendname}`,
        {status: "block"},
        {withCredentials: true}
      );

      setFeedback(data.message);
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
    setUsertoFind("");
  };

  const unblockUser = async (friendname: string) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${authname}/friendships/${friendname}`,
        {withCredentials: true}
      );

      setFeedback(data.message);
      //dispatch(getMyFriendships());
    } catch(err) {
      setFeedback(error);
    }

    //delay(4000);
    setFeedback("");
  };

  const inputChange = (e: SyntheticEvent) =>
    setUsertoFind((e.target as HTMLInputElement).value);

  const tabChange = (value: string) => setTab(value);

  const validateUserToFind = () => (userToFind.trim()).length > 1;

  return (
    <div className="two-col friends">
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends-find">
        <label htmlFor="friends-find-input">Username:</label>
        <input name="friends-find-input" onChange={inputChange} value={userToFind} />

        <button
          className="--request"
          disabled={loading}
          name="friends-find-request"
          onClick={requestFriendship}
        >Send Friend Request</button>
        
        <button
          className="--block"
          disabled={loading}
          name="friends-find-block"
          onClick={blockUser}
        >Block User</button>
      </div>

      <div className="friends-tabs">
        <button
          className={tab === "accepted" ? "--active" : ""}
          name="current"
          onClick={() => tabChange("accepted")}
        >Current</button>
        
        <button
          className={tab === "pending-received" ? "--active" : ""}
          name="pending"
          onClick={() => tabChange("pending-received")}
        >Pending</button>
        
        <button
          className={tab === "blocked" ? "--active" : ""}
          name="blocked"
          onClick={() => tabChange("blocked")}
        >Blocked</button>
      </div>

      <div className="friends-list">
        {my_friendships.filter(f => f.status === tab).map(f => (
          <div className="friends-item" key={f.username}>
            <span className="avatar">
              <img src={`${url}/${f.avatar}-tiny`} />
            </span>

            <span className="username">
              <Link href={`/profile/${f.username}`}>{f.username}</Link>
            </span>

            {f.status === "pending-received" && (
              <button
                className="action"
                disabled={loading}
                name="accept"
                onClick={() => acceptFriendship(f.username)}
              >Accept</button>
            )}
            
            {f.status === "pending-received" && (
              <button
                className="delete"
                disabled={loading}
                name="reject"
                onClick={() => rejectFriendship(f.username)}
              >Reject</button>
            )}
            
            {f.status === "accepted" && (
              <button
                className="delete"
                disabled={loading}
                name="unfriend"
                onClick={() => deleteFriendship(f.username)}
              >Unfriend</button>
            )}
            
            {f.status === "blocked" && (
              <button
                className="delete"
                disabled={loading}
                name="unblock"
                onClick={() => unblockUser(f.username)}
              >Unblock</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

const error = 'An error occurred. Please try again.';
