import Link from 'next/link';

import { IFriendship } from '../../store/data/types';

export function FriendsView({
  myFriendships,
  feedback,
  acceptFriendship,
  blockUser,
  deleteFriendship,
  inputChange,
  rejectFriendship,
  requestFriendship,
  tabChange,
  unblockUser,
  loading,
  tab,
  twoColumnATheme,
  userToFind
}: Props): JSX.Element {
  return (
    <div className={`friends two-column-a ${twoColumnATheme}`}>
      <h1>Friends</h1>

      <p className="feedback">{feedback}</p>

      <div className="friends__find">
        <label className="friends__find-label" htmlFor="friends-find-input">
          Username:
        </label>

        <input
          className="friends__find-input"
          name="friends-find-input"
          onChange={inputChange}
          value={userToFind}
        />

        <button
          className="friends__find-request-button"
          disabled={loading}
          name="friends-find-request"
          onClick={requestFriendship}
        >
          Send Friend Request
        </button>

        <button
          className="friends__find-block-button"
          disabled={loading}
          name="friends-find-block"
          onClick={blockUser}
        >
          Block User
        </button>
      </div>

      <hr className="friends__hr" />

      <div className="friends__tabs">
        <button
          className={
            tab === "accepted" ? "friends__tab--active" : "friends__tab"
          }
          name="current"
          onClick={() => tabChange("accepted")}
        >
          Current
        </button>

        <button
          className={
            tab === "pending-received"
            ? "friends__tab--active"
            : "friends__tab"
          }
          name="pending"
          onClick={() => tabChange("pending-received")}
        >
          Pending
        </button>

        <button
          className={
            tab === "blocked" ? "friends__tab--active" : "friends__tab"
          }
          name="blocked"
          onClick={() => tabChange("blocked")}
        >
          Blocked
        </button>
      </div>

      <div className="friends__list">
        {myFriendships
          .filter(f => f.status === tab)
          .map(f => (
            <div className="friends__list-item" key={f.username}>
              <span className="friends__list-item-avatar">
                <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${f.avatar}-tiny`} />
              </span>

              <span className="friends__list-item-username">
                <Link href={`/profile/${f.username}`}>
                  <a>{f.username}</a>
                </Link>
              </span>

              {f.status === "pending-received" &&
                <button
                  className="friends__list-item-action"
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
                  className="friends__list-item-delete"
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
                  className="friends__list-item-delete"
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
                  className="friends__list-item-delete"
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
  myFriendships: IFriendship[];
  feedback: string;
  acceptFriendship(e: React.SyntheticEvent<EventTarget>): void;
  blockUser(): void;
  deleteFriendship(e: React.SyntheticEvent<EventTarget>): void;
  inputChange(e: React.SyntheticEvent<EventTarget>): void;
  rejectFriendship(e: React.SyntheticEvent<EventTarget>): void;
  requestFriendship(): void;
  tabChange(value: string): void;
  unblockUser(e: React.SyntheticEvent<EventTarget>): void;
  loading: boolean;
  tab: string;
  twoColumnATheme: string;
  userToFind: string;
};