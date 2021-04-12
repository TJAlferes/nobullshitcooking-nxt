import React from 'react';

import { IUser } from '../../../store/chat/types';
import './people.css';

export function PeopleView({
  focusedFriend,
  focusedUser,
  handleFriendClick,
  handlePeopleTabChange,
  handleUserClick,
  onlineFriends,
  peopleTab,
  startPrivateMessage,
  users
}: Props): JSX.Element {
  return (
    <div className="chat__people">
      <div className="people__tabs">
        <button
          className={
            (peopleTab === "Room") ? "people__tab--current" : "people__tab"
          }
          onClick={() => handlePeopleTabChange("Room")}
        >
          Room
        </button>

        <button
          className={
            (peopleTab === "Friends") ? "people__tab--current" : "people__tab"
          }
          onClick={() => handlePeopleTabChange("Friends")}
        >
          Friends
        </button>
      </div>

      {peopleTab === "Room" && (
        <ul className="chat__persons">
          {users && users.map(({ username }) => (
            <li
              className="chat__person"
              key={username}
              onClick={() => handleUserClick(username)}
            >
              <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${username}-tiny`} />
              
              <span>{username}</span>

              {focusedUser && focusedUser === username &&
                <div className="chat__person-tooltip">
                  <button
                    className="person-tooltip__start-private-message"
                    onClick={() => startPrivateMessage(username)}
                  >
                    Whisper
                  </button>
                </div>
              }
            </li>
          ))}
        </ul>
      )}

      {peopleTab === "Friends" && (
        <ul className="chat__persons">
          {onlineFriends && onlineFriends.map(({ username }) => (
            <li
              className="chat__person"
              key={username}
              onClick={() => handleFriendClick(username)}
            >
              <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${username}-tiny`} />
              
              <span>{username}</span>
              
              {focusedFriend && focusedFriend === username &&
                <div className="chat__person-tooltip">
                  <button
                    className="person-tooltip__start-private-message"
                    onClick={() => startPrivateMessage(username)}
                  >
                    Whisper
                  </button>
                </div>
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Props = {
  focusedFriend: string | null;
  focusedUser: string | null;
  handleFriendClick(friend: string): void;
  handlePeopleTabChange(value: string): void;
  handleUserClick(user: string): void;
  onlineFriends: IUser[];
  peopleTab: string;
  startPrivateMessage(username: string): void;
  users: IUser[];
};