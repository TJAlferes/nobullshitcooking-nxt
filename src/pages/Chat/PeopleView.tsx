import { IUser } from '../../store/chat/types';

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

export function PeopleView({
  changePeopleTab,
  focusedFriend,
  focusFriend,
  focusedUser,
  focusUser,
  onlineFriends,
  peopleTab,
  startPrivateMessage,
  users
}: Props): JSX.Element {
  const Tab = ({ tab }: TabProps) => (
    <button
      className={peopleTab === tab ? "people__tab--current" : "people__tab"}
      onClick={() => changePeopleTab(tab)}
    >
      {tab}
    </button>
  );

  return (
    <div className="chat__people">
      <div className="people__tabs">
        <Tab tab="Room" />

        <Tab tab="Friends" />
      </div>

      {peopleTab === "Room" && (
        <ul className="chat__persons">
          {users && users.map(({ username }) => (
            <li
              className="chat__person"
              key={username}
              onClick={() => focusUser(username)}
            >
              <img className="person-avatar" src={`${url}/${username}-tiny`} />
              
              <span className="person-username">{username}</span>

              {focusedUser && focusedUser === username &&
                <div className="person-tooltip">
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
              onClick={() => focusFriend(username)}
            >
              <img className="person-avatar" src={`${url}/${username}-tiny`} />
              
              <span className="person-username">{username}</span>
              
              {focusedFriend && focusedFriend === username &&
                <div className="person-tooltip">
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
  changePeopleTab(value: string): void;
  focusedFriend: string | null;
  focusFriend(friend: string): void;
  focusedUser: string | null;
  focusUser(user: string): void;
  onlineFriends: IUser[];
  peopleTab: string;
  startPrivateMessage(username: string): void;
  users: IUser[];
};

type TabProps = {
  tab: string;
};