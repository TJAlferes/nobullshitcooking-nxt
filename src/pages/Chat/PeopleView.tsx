const url = "https://s3.amazonaws.com/nobsc-user-avatars";

export function PeopleView({ changePeopleTab, focusedFriend, focusFriend, focusedUser, focusUser, friends, peopleTab, startPrivateMessage, users }: Props) {
  return (
    <div className="chat-people">
      <div className="people-tabs">
        <button className={peopleTab === "Room" ? "--current" : ""}    onClick={() => changePeopleTab("Room")}>Room</button>
        <button className={peopleTab === "Friends" ? "--current" : ""} onClick={() => changePeopleTab("Friends")}>Friends</button>
      </div>

      {peopleTab === "Room" && (
        <ul className="chat-persons">
          {users && users.map(user => (
            <li className="chat-person" key={user} onClick={() => focusUser(user)}>
              <img src={`${url}/${user}-tiny`} />
              <span>{user}</span>
              {focusedUser && focusedUser === user && (
                <div className="person-tooltip"><button onClick={() => startPrivateMessage(user)}>Whisper</button></div>
              )}
            </li>
          ))}
        </ul>
      )}

      {peopleTab === "Friends" && (
        <ul className="chat-persons">
          {friends && friends.map(friend => (
            <li className="chat-person" key={friend} onClick={() => focusFriend(friend)}>
              <img src={`${url}/${friend}-tiny`} />
              <span>{friend}</span>
              {focusedFriend && focusedFriend === friend && (
                <div className="person-tooltip"><button onClick={() => startPrivateMessage(friend)}>Whisper</button></div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Props = {
  changePeopleTab(value: string):        void;
  focusedFriend:                         string | undefined;
  focusFriend(friend: string):           void;
  focusedUser:                           string | undefined;
  focusUser(user: string):               void;
  friends:                               string[];
  peopleTab:                             string;
  startPrivateMessage(username: string): void;
  users:                                 string[];
};
