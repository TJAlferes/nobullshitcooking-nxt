import Link from 'next/link';
import { useState } from 'react';

import { useApi, useAuth, useUserData, useTheme } from '../../../store';

export default function Friends() {
  const { api } = useApi();
  const { authname } = useAuth();
  const { my_friendships, setMyFriendships } = useUserData();
  const { theme } = useTheme();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPageNavOpen, setIsPageNavOpen] = useState(false);
  const [tab, setTab] = useState('accepted');
  const [userToFind, setUsertoFind] = useState('');

  const url = `/users/${authname}/friendships`;
  const error = 'An error occurred. Please try again.';

  const getMyFriendships = async () => {
    const res = await api.get(url);
    setMyFriendships(res.data);
  };

  const requestFriendship = async () => {
    if (loading) return;
    const friendname = userToFind.trim();
    if (friendname === authname) return;
    setLoading(true);
    try {
      const res = await api.post(`/${url}/${friendname}/create`);
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
      const res = await api.patch(`${url}/${friendname}/accept`);
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
      const res = await api.delete(`${url}/${friendname}/reject`);
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
      const res = await api.delete(`${url}/${friendname}/delete`);
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
      const res = await api.post(`${url}/${friendname}/block`);
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
      const res = await api.delete(`${url}/${friendname}/unblock`);
      if (res.status === 204) setFeedback('User unblocked.');
      else setFeedback(res.data.message);
      await getMyFriendships();
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  const officialUrl = 'https://s3.amazonaws.com/nobsc-official-uploads/avatar';
  const publicUrl = 'https://s3.amazonaws.com/nobsc-public-uploads/avatar';

  return (
    <div className="one-col friends">
      <div className="page-nav-container">
        <svg
          className="page-nav-toggle"
          onClick={() => setIsPageNavOpen(prev => !prev)}
          style={{
            outline: isPageNavOpen
              ? `2px solid ${theme === 'light' ? '#bfddfa' : '#507ea7'}`
              : 'none'
          }}
        >
          <g>
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill={theme === 'light' ? '#000' : '#aaa'}
            ></path>
          </g>
        </svg>

        <h1>Friends</h1>
      </div>

      <p className="feedback">{feedback}</p>

      {isPageNavOpen ? (
        <>
          <div className="page-nav-shadow"></div>

          <nav className="page-nav friends-nav">
            <div
              className={`menu-item ${tab === 'accepted' ? '--active' : ''}`}
              onClick={() => {
                setTab('accepted');
                setIsPageNavOpen(false);
              }}
            >Current Friends</div>
    
            <div
              className={`menu-item ${tab === 'pending-received' ? '--active' : ''}`}
              onClick={() => {
                setTab('pending-received');
                setIsPageNavOpen(false);
              }}
            >Pending (Received)</div>
    
            <div
              className={`menu-item ${tab === 'pending-sent' ? '--active' : ''}`}
              onClick={() => {
                setTab('pending-sent');
                setIsPageNavOpen(false);
              }}
            >Pending (Sent)</div>
            
            <div
              className={`menu-item ${tab === 'blocked' ? '--active' : ''}`}
              onClick={() => {
                setTab('blocked');
                setIsPageNavOpen(false);
              }}
            >Blocked Users</div>

            <div
              className={`menu-item ${tab === 'send' ? '--active' : ''}`}
              onClick={() => {
                setTab('send');
                setIsPageNavOpen(false);
              }}
            >Send Friend Request</div>

            <div
              className={`menu-item ${tab === 'block' ? '--active' : ''}`}
              onClick={() => {
                setTab('block');
                setIsPageNavOpen(false);
              }}
            >Block User</div>
          </nav>
        </>
      ) : false}

      {tab === 'accepted' ? (
        <div className='friends-content accepted'>
          <h2>Current Friends</h2>
          <div className='friends-list'>
            {my_friendships.filter(f => f.status === tab).length > 0
              ? my_friendships.filter(f => f.status === tab).map(f => (
                <div className="friends-item" key={f.username}>
                  <span className="avatar">
                    <img
                      src={f.avatar === 'default'
                        ? `${officialUrl}/default-tiny.jpg`
                        : `${publicUrl}/${f.user_id}/${f.avatar}-tiny.jpg`
                      }
                    />
                  </span>
                  <span className="username">
                    <Link href={`/${f.username}/profile`}>{f.username}</Link>
                  </span>
                  <button
                    className="delete"
                    disabled={loading}
                    onClick={() => deleteFriendship(f.username)}
                  >Unfriend</button>
                </div>
              ))
              : <div className="no-content">You have no friends yet.</div>
            }
          </div>
        </div>
      ) : false}

      {tab === 'pending-received' ? (
        <div className='friends-content pending-received'>
          <h2>Pending (Received)</h2>
          <div className='friends-list'>
            {my_friendships.filter(f => f.status === tab).length > 0
              ? my_friendships.filter(f => f.status === tab).map(f => (
                <div className="friends-item" key={f.username}>
                  <span className="avatar">
                    <img
                      src={f.avatar === 'default'
                        ? `${officialUrl}/default-tiny.jpg`
                        : `${publicUrl}/${f.user_id}/${f.avatar}-tiny.jpg`
                      }
                    />
                  </span>
                  <span className="username">
                    <Link href={`/${f.username}/profile`}>{f.username}</Link>
                  </span>
                  <button
                    className="action"
                    disabled={loading}
                    onClick={() => acceptFriendship(f.username)}
                  >Accept</button>
                  <button
                    className="delete"
                    disabled={loading}
                    onClick={() => rejectFriendship(f.username)}
                  >Reject</button>
                </div>
              ))
              : <div className="no-content">You have no pending received friend requests.</div>
            }
          </div>
        </div>
      ) : false}

      {tab === 'pending-sent' ? (
        <div className='friends-content pending-sent'>
          <h2>Pending (Sent)</h2>
          <div className='friends-list'>
            {my_friendships.filter(f => f.status === tab).length > 0
              ? my_friendships.filter(f => f.status === tab).map(f => (
                <div className="friends-item" key={f.username}>
                  <span className="avatar">
                    <img
                      src={f.avatar === 'default'
                        ? `${officialUrl}/default-tiny.jpg`
                        : `${publicUrl}/${f.user_id}/${f.avatar}-tiny.jpg`
                      }
                    />
                  </span>
                  <span className="username">
                    <Link href={`/${f.username}/profile`}>{f.username}</Link>
                  </span>
                </div>
              ))
              : <div className="no-content">You have no pending sent friend requests.</div>
            }
          </div>
        </div>
      ) : false}

      {tab === 'blocked' ? (
        <div className='friends-content blocked'>
          <h2>Blocked Users</h2>
          <div className='friends-list'>
            {my_friendships.filter(f => f.status === tab).length > 0
              ? my_friendships.filter(f => f.status === tab).map(f => (
                <div className="friends-item" key={f.username}>
                  <span className="avatar">
                    <img
                      src={f.avatar === 'default'
                        ? `${officialUrl}/default-tiny.jpg`
                        : `${publicUrl}/${f.user_id}/${f.avatar}-tiny.jpg`
                      }
                    />
                  </span>
                  <span className="username">
                    <Link href={`/${f.username}/profile`}>{f.username}</Link>
                  </span>
                  <button
                    className="delete"
                    disabled={loading}
                    onClick={() => unblockUser(f.username)}
                  >Unblock</button>
                </div>
              ))
              : <div className="no-content">You haven't blocked any users.</div>
            }
          </div>
        </div>
      ) : false}

      {tab === 'send' ? (
        <div className='friends-content send'>
          <h2>Send Friend Request</h2>
          <label htmlFor="user-to-find">Username</label>
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
            type="button"
          >Send Friend Request</button>
        </div>
      ) : false}

      {tab === 'block' ? (
        <div className='friends-content block'>
          <h2>Block User</h2>
          <label htmlFor="user-to-find">Username</label>
          <input
            name='user-to-find'
            onChange={e => setUsertoFind(e.target.value)}
            value={userToFind}
            minLength={6}
            maxLength={20}
          />
          <button
            className="--block"
            disabled={loading}
            onClick={blockUser}
            type="button"
          >Block User</button>
        </div>
      ) : false}

    </div>
  );
}
