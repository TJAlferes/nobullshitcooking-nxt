import Link from 'next/link';

import { IFriendship } from '../../store/data/types';

export function FriendsView({
  acceptFriendship,
  blockUser,
  deleteFriendship,
  feedback,
  inputChange,
  loading,
  myFriendships,
  rejectFriendship,
  requestFriendship,
  tab,
  tabChange,
  theme,
  unblockUser,
  userToFind
}: Props): JSX.Element {
  return (
    <div className={`friends two-col-a ${theme}`}>
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends-find">
        <label className="friends-find__label" htmlFor="friends-find-input">
          Username:
        </label>

        <input
          className="friends-find__input"
          name="friends-find-input"
          onChange={inputChange}
          value={userToFind}
        />

        <button
          className="friends-find__button--request"
          disabled={loading}
          name="friends-find-request"
          onClick={requestFriendship}
        >
          Send Friend Request
        </button>

        <button
          className="friends-find__button--block"
          disabled={loading}
          name="friends-find-block"
          onClick={blockUser}
        >
          Block User
        </button>
      </div>

      <div className="friends-tabs">
        <button
          className={tab === "accepted" ? "friends-tab--active" : "friends-tab"}
          name="current"
          onClick={() => tabChange("accepted")}
        >
          Current
        </button>

        <button
          className={
            tab === "pending-received" ? "friends-tab--active" : "friends-tab"
          }
          name="pending"
          onClick={() => tabChange("pending-received")}
        >
          Pending
        </button>

        <button
          className={tab === "blocked" ? "friends-tab--active" : "friends-tab"}
          name="blocked"
          onClick={() => tabChange("blocked")}
        >
          Blocked
        </button>
      </div>

      <div className="friends-list">
        {myFriendships
          .filter(f => f.status === tab)
          .map(f => (
            <div className="friends-item" key={f.username}>
              <span className="friends-item-avatar">
                <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${f.avatar}-tiny`} />
              </span>

              <span className="friends-item-username">
                <Link href={`/profile/${f.username}`}>
                  <a className="friends-item__a">{f.username}</a>
                </Link>
              </span>

              {f.status === "pending-received" &&
                <button
                  className="friends-item-action"
                  disabled={loading}
                  name="accept"
                  onClick={acceptFriendship}
                  value={f.username}
                >
                  Accept
                </button>
              }

              {f.status === "pending-received" &&
                <button
                  className="friends-item-delete"
                  disabled={loading}
                  name="reject"
                  onClick={rejectFriendship}
                  value={f.username}
                >
                  Reject
                </button>
              }

              {f.status === "accepted" &&
                <button
                  className="friends-item-delete"
                  disabled={loading}
                  name="unfriend"
                  onClick={deleteFriendship}
                  value={f.username}
                >
                  Unfriend
                </button>
              }
              
              {f.status === "blocked" &&
                <button
                  className="friends-item-delete"
                  disabled={loading}
                  name="unblock"
                  onClick={unblockUser}
                  value={f.username}
                >
                  Unblock
                </button>
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

type Props = {
  acceptFriendship(e: React.SyntheticEvent<EventTarget>): void;
  blockUser(): void;
  deleteFriendship(e: React.SyntheticEvent<EventTarget>): void;
  feedback: string;
  inputChange(e: React.SyntheticEvent<EventTarget>): void;
  loading: boolean;
  myFriendships: IFriendship[];
  rejectFriendship(e: React.SyntheticEvent<EventTarget>): void;
  requestFriendship(): void;
  tab: string;
  tabChange(value: string): void;
  theme: string;
  unblockUser(e: React.SyntheticEvent<EventTarget>): void;
  userToFind: string;
};