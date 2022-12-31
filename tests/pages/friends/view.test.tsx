import { shallow } from 'enzyme';
import React from 'react';

import { FriendsView } from '../../../src/pages/friends/view';

const myFriendships = [
  {user_id: 2, username: "Jack", status: "accepted"},
  {user_id: 3, username: "Jill", status: "accepted"},
  {user_id: 4, username: "John", status: "pending-received"},
  {user_id: 5, username: "Jane", status: "blocked"}
];

const acceptFriendship =  jest.fn();
const blockUser =         jest.fn();
const deleteFriendship =  jest.fn();
const inputChange =       jest.fn();
const rejectFriendship =  jest.fn();
const requestFriendship = jest.fn();
const tabChange =         jest.fn();
const unblockUser =       jest.fn();

const initialProps = {
  acceptFriendship,
  blockUser,
  deleteFriendship,
  feedback: "Some message.",
  inputChange,
  loading: false,
  myFriendships,
  rejectFriendship,
  requestFriendship,
  tabChange,
  theme: "light",
  unblockUser,
  userToFind: "Person2"
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('FriendsView', () => {
  const wrapper = shallow(<FriendsView tab="accepted" {...initialProps} />);

  it('displays feedback', () => {
    expect(wrapper.find('p.feedback').text()).toEqual("Some message.");
  });

  it('displays a username input element', () => {
    expect(wrapper.find('input[name="friends-find-input"]')).toHaveLength(1);
  });

  it('displays a button element with text Send Friend Request', () => {
    expect(wrapper.find('button[name="friends-find-request"]').text()).toEqual("Send Friend Request");
  });

  it('displays a button element with text Block User', () => {
    expect(wrapper.find('button[name="friends-find-block"]').text()).toEqual("Block User");
  });

  it('displays a button element with text Current', () => {
    expect(wrapper.find('button[name="current"]').text()).toEqual("Current");
  });

  it('displays a button element with text Pending', () => {
    expect(wrapper.find('button[name="pending"]').text()).toEqual("Pending");
  });

  it('displays a button element with text Blocked', () => {
    expect(wrapper.find('button[name="blocked"]').text()).toEqual("Blocked");
  });

  it('displays an unfriend button element for each accepted friend', () => {
    expect(wrapper.find('button[name="unfriend"]')).toHaveLength(2);
  });
});

describe('when on Pending tab', () => {
  it('displays accept and reject button elements for each pending friend', () => {
      const wrapper = shallow(<FriendsView tab="pending-received" {...initialProps} />);
      expect(wrapper.find('button[name="accept"]')).toHaveLength(1);
      expect(wrapper.find('button[name="reject"]')).toHaveLength(1);
    }
  );
});

describe('when on Blocked tab', () => {
  it('displays an unblock button element for each blocked user', () => {
    const wrapper = shallow(<FriendsView tab="blocked" {...initialProps} />);
    expect(wrapper.find('button[name="unblock"]')).toHaveLength(1);
  });
});