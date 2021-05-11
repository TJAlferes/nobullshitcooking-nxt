import { shallow } from 'enzyme';
import React, { useRef } from 'react';

import { MessagesView } from '../../../src/pages/chat/MessagesView';
import { OptionsView } from '../../../src/pages/chat/OptionsView';
import { PeopleView } from '../../../src/pages/chat/PeopleView';
import { ChatView } from '../../../src/pages/chat/view';

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  const mockUseRef = jest.fn();
  return {...originalModule, useRef: mockUseRef};
});

const changeMessageInput = jest.fn();
const changeMobileTab = jest.fn();
const changePeopleTab = jest.fn();
const changeRoom = jest.fn();
const changeRoomInput = jest.fn();
const connect = jest.fn();
const disconnect = jest.fn();
const focusFriend = jest.fn();
const focusUser = jest.fn();
const messagesRef = useRef<HTMLUListElement>(null);
const sendMessage = jest.fn();
const startPrivateMessage = jest.fn();

const initialProps = {
  authname: "Person",
  changeMessageInput,
  changeMobileTab,
  changePeopleTab,
  changeRoom,
  changeRoomInput,
  connect,
  disconnect,
  feedback: "Some message.",
  focusedFriend: null,
  focusFriend,
  focusedUser: null,
  focusUser,
  loading: false,
  messages: [],
  messagesRef,
  messageToSend: "How goes it?",
  mobileTab: "Options",
  onlineFriends: [],
  peopleTab: "Room",
  room: "5067",
  roomToEnter: "",
  sendMessage,
  startPrivateMessage,
  status: "Disconnected",
  theme: "light",
  users: []
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ChatView', () => {
  const wrapper = shallow(<ChatView {...initialProps} />);

  it('displays feedback', () => {
    expect(wrapper.find('p.feedback').text())
      .toEqual("Some message.");
  });

  it('displays OptionsView component', () => {
    expect(wrapper.find(OptionsView)).toHaveLength(1);
  });

  it('displays MessagesView component', () => {
    expect(wrapper.find(MessagesView)).toHaveLength(1);
  });

  it('displays PeopleView component', () => {
    expect(wrapper.find(PeopleView)).toHaveLength(1);
  });
});