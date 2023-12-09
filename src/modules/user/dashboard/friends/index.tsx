import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

import { endpoint } from '../../../../config/api';
import { useAuth, useUserData } from '../../../../store';

export default function Friends() {
  const { authname } = useAuth();
  const { my_friendships, setMyFriendships } = useUserData();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('current');
  const [userToFind, setUsertoFind] = useState('');

  const url = `${endpoint}/users/${authname}/friendships`;
  const error = 'An error occurred. Please try again.';

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
      if (res.status === 201) setFeedback('Friendship request sent.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setFeedback('');
      setUsertoFind('');
    }, 4000);
  };

  const acceptFriendship = async (friendname: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(`${url}/${friendname}/accept`, {}, {withCredentials: true});
      if (res.status === 204) setFeedback('Friendship request accepted.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  const rejectFriendship = async (friendname: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.delete(`${url}/${friendname}/reject`, {withCredentials: true});
      if (res.status === 204) setFeedback('Friendship request rejected.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  const deleteFriendship = async (friendname: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.delete(`${url}/${friendname}/delete`, {withCredentials: true});
      if (res.status === 204) setFeedback('Friendship deleted.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  const blockUser = async () => {
    if (loading) return;
    const friendname = userToFind.trim();
    if (friendname === authname) return;
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.post(`${url}/${friendname}/block`, {}, {withCredentials: true});
      if (res.status === 204) setFeedback('User blocked.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setFeedback('');
      setUsertoFind('');
    }, 4000);
  };

  const unblockUser = async (friendname: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.delete(`${url}/${friendname}/unblock`, {withCredentials: true});
      if (res.status === 204) setFeedback('User unblocked.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  return (
    <div className="two-col friends">
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends-find">
        <label htmlFor="user-to-find">Username:</label>
        <input
          name='user-to-find'
          onChange={e => setUsertoFind(e.target.value)}
          value={userToFind}
          minLength={6}
          maxLength={20}
        />

        <button
          className="--request"
          disabled={loading}
          onClick={requestFriendship}
        >Send Friend Request</button>
        
        <button
          className="--block"
          disabled={loading}
          onClick={blockUser}
        >Block User</button>
      </div>

      <div className="friends-tabs">
        <button
          className={tab === 'pending-received' ? '--active' : ''}
          onClick={() => setTab('pending-received')}
        >Pending Received</button>

        <button
          className={tab === 'pending-sent' ? '--active' : ''}
          onClick={() => setTab("pending-sent")}
        >Pending Sent</button>

        <button
          className={tab === 'accepted' ? '--active' : ''}
          onClick={() => setTab('accepted')}
        >Current</button>
        
        <button
          className={tab === 'blocked' ? '--active' : ''}
          onClick={() => setTab('blocked')}
        >Blocked</button>
      </div>

      <div className="friends-list">
        {my_friendships.filter(f => f.status === tab).map(f => (
          <div className="friends-item" key={f.username}>
            <span className="avatar">
              <img
                src={f.avatar === 'default'
                  ? 'https://s3.amazonaws.com/nobsc-official-uploads/avatar/default-tiny.jpg'
                  : `https://s3.amazonaws.com/nobsc-public-uploads/avatar/${f.user_id}/${f.avatar}-tiny.jpg`
                }
              />
            </span>

            <span className="username">
              <Link href={`/${f.username}/profile`}>{f.username}</Link>
            </span>

            {f.status === 'pending-received' && (
              <button
                className="action"
                disabled={loading}
                onClick={() => acceptFriendship(f.username)}
              >Accept</button>
            )}
            
            {f.status === 'pending-received' && (
              <button
                className="delete"
                disabled={loading}
                onClick={() => rejectFriendship(f.username)}
              >Reject</button>
            )}
            
            {f.status === 'accepted' && (
              <button
                className="delete"
                disabled={loading}
                onClick={() => deleteFriendship(f.username)}
              >Unfriend</button>
            )}
            
            {f.status === 'blocked' && (
              <button
                className="delete"
                disabled={loading}
                onClick={() => unblockUser(f.username)}
              >Unblock</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
