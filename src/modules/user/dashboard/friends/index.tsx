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
    const res = await axios.get(url, {withCredentials: true});
    setMyFriendships(res.data);
  };

  const requestFriendship = async () => {
    if (loading) return;
    const friendname = userToFind.trim();
    if (friendname === authname) return;
    setLoading(true);
    try {
      const res = await axios.post(`${url}/${friendname}/create`, {}, {withCredentials: true});
      if (res.status === 201) setFeedback("Friendship request sent.");
      if (res.status === 403) setFeedback(res.data.message);
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setFeedback("");
      setUsertoFind("");
    }, 4000);
  };

  const acceptFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const res = await axios.put(`${url}/${friendname}/accept`, {}, {withCredentials: true});
      if (res.status === 204) setFeedback("Friendship request accepted.");
      if (res.status === 403) setFeedback("Could not process.");
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(""), 4000);
  };

  const rejectFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const res = await axios.put(`${url}/${friendname}/reject`, {}, {withCredentials: true});
      if (res.status === 204) setFeedback("Friendship request rejected.");
      if (res.status === 403) setFeedback("Could not process.");
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(""), 4000);
  };

  const deleteFriendship = async (friendname: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${url}/${friendname}/delete`, {withCredentials: true});
      if (res.status === 204) setFeedback("Friendship deleted.");
      if (res.status === 403) setFeedback("Forbidden.");
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(""), 4000);
  };

  const blockUser = async () => {
    if (loading) return;
    const friendname = userToFind.trim();
    if (friendname === authname) return;
    setLoading(true);
    try {
      const res = await axios.post(`${url}/${friendname}/block`, {}, {withCredentials: true});
      if (res.status === 204) setFeedback("User blocked.");
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setFeedback("");
      setUsertoFind("");
    }, 4000);
  };

  const unblockUser = async (friendname: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${url}/${friendname}/unblock`, {withCredentials: true});
      if (res.status === 204) setFeedback("User unblocked.");
      if (res.status === 403) setFeedback("Forbidden.");
      if (res.status === 404) setFeedback("Not found.");
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(""), 4000);
  };

  const inputChange = (e: ChangeEvent) => setUsertoFind(e.target.value);

  const tabChange = (value: string) => setTab(value);

  return (
    <div className="two-col friends">
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends-find">
        <label htmlFor="friends-find-input">Username:</label>
        <input
          name="friends-find-input"
          onChange={inputChange}
          value={userToFind}
          minLength={6}
          maxLength={20}
        />

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
              <img src={`${s3Url}/${f.avatar}-tiny`} />
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

const error = 'An error occurred. Please try again.';

const s3Url = '';  // TO DO: finish

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
