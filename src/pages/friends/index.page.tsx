import Link                    from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import {
  acceptFriendship  as userAcceptFriendship,
  blockUser         as userBlockUser,
  deleteFriendship  as userDeleteFriendship,
  rejectFriendship  as userRejectFriendship,
  requestFriendship as userRequestFriendship,
  unblockUser       as userUnblockUser
} from '../../store/user/friendship/actions';

// Just make this a Dashboard tab?
export default function Friends() {
  const dispatch = useDispatch();
  const authname =      useSelector(state => state.auth.authname);
  const myFriendships = useSelector(state => state.data.myFriendships);
  const message =       useSelector(state => state.user.message);

  const [ feedback,   setFeedback ] =   useState("");
  const [ loading,    setLoading ] =    useState(false);
  const [ tab,        setTab ] =        useState("accepted");
  const [ userToFind, setUsertoFind ] = useState("");

  const url = "https://s3.amazonaws.com/nobsc-user-avatars";

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
    <div className="two-col friends">
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends-find">
        <label htmlFor="friends-find-input">Username:</label>
        <input name="friends-find-input" onChange={inputChange} value={userToFind} />
        <button className="--request" disabled={loading} name="friends-find-request" onClick={requestFriendship}>Send Friend Request</button>
        <button className="--block"   disabled={loading} name="friends-find-block"   onClick={blockUser}>Block User</button>
      </div>

      <div className="friends-tabs">
        <button className={tab === "accepted" ? "--active" : ""}         name="current" onClick={() => tabChange("accepted")}>Current</button>
        <button className={tab === "pending-received" ? "--active" : ""} name="pending" onClick={() => tabChange("pending-received")}>Pending</button>
        <button className={tab === "blocked" ? "--active" : ""}          name="blocked" onClick={() => tabChange("blocked")}>Blocked</button>
      </div>

      <div className="friends-list">
        {myFriendships.filter(f => f.status === tab).map(f => (
          <div className="friends-item" key={f.username}>
            <span className="avatar"><img src={`${url}/${f.avatar}-tiny`} /></span>

            <span className="username"><Link href={`/profile/${f.username}`}>{f.username}</Link></span>

            {f.status === "pending-received" && <button className="action" disabled={loading} name="accept"   onClick={() => acceptFriendship(f.username)}>Accept</button>}
            {f.status === "pending-received" && <button className="delete" disabled={loading} name="reject"   onClick={() => rejectFriendship(f.username)}>Reject</button>}
            {f.status === "accepted" &&         <button className="delete" disabled={loading} name="unfriend" onClick={() => deleteFriendship(f.username)}>Unfriend</button>}
            {f.status === "blocked" &&          <button className="delete" disabled={loading} name="unblock"  onClick={() => unblockUser(f.username)}>Unblock</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
