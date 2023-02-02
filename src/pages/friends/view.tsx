import Link from 'next/link';

import type { IFriendship } from '../../store/data/types';

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

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
  unblockUser,
  userToFind
}: Props): JSX.Element {
  return (
    <div className="friends two-col-a">
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
            {f.status === "blocked" &&          <button className="delete" disabled={loading} name="unblock"  onClick={() => unblockUser(f.username)}     >Unblock</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  acceptFriendship(name: string): void;
  blockUser():                    void;
  deleteFriendship(name: string): void;
  feedback:                       string;
  inputChange(e: SyntheticEvent): void;
  loading:                        boolean;
  myFriendships:                  IFriendship[];
  rejectFriendship(name: string): void;
  requestFriendship():            void;
  tab:                            string;
  tabChange(value: string):       void;
  unblockUser(name: string):      void;
  userToFind:                     string;
};