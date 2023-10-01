import axios        from 'axios';
import Link         from 'next/link';
import { useState } from 'react';

import { endpoint }             from '../../../../config/api';
import { useAuth, useUserData } from '../../../../store';

export default function Friends() {
  const { authname }       = useAuth();
  const { my_friendships, setMyFriendships } = useUserData();

  const [ userToFind, setUsertoFind ] = useState("");
  const [ feedback,   setFeedback ]   = useState("");
  const [ loading,    setLoading ]    = useState(false);
  const [ tab,        setTab ]        = useState("accepted");

  const url = `${endpoint}/users/${authname}/friendships`;

  const getMyFriendships = async () => {
    const { data } = await axios.get(url, {withCredentials: true});
    setMyFriendships(data);
  };

  const requestFriendship = async () => {
    if (loading) return;
    if (!validateUserToFind()) return;
    const friendname = userToFind.trim();
    if (friendname === authname) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        url,
        {friendname},
        {withCredentials: true}
      );
      setFeedback(data.message);
      await getMyFriendships();
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
        `${url}/${friendname}`,
        {status: "accept"},
        {withCredentials: true}
      );
      setFeedback(data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    //delay(4000);
    setFeedback("");
  };

  const deleteFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${url}/${friendname}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      await getMyFriendships();
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
        `${url}/${friendname}`,
        {status: "block"},
        {withCredentials: true}
      );
      setFeedback(data.message);
      await getMyFriendships();
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
        `${url}/${friendname}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    //delay(4000);
    setFeedback("");
  };

  const inputChange = (e: ChangeEvent) => setUsertoFind(e.target.value);

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
                onClick={() => deleteFriendship(f.username)}
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

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

const error = 'An error occurred. Please try again.';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
