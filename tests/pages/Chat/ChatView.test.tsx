import { shallow } from 'enzyme';
import React, { useRef } from 'react';

import { MessagesView } from '../../../src/pages/Chat/MessagesView/MessagesView';
import { OptionsView } from '../../../src/pages/Chat/OptionsView/OptionsView';
import { PeopleView } from '../../../src/pages/Chat/PeopleView/PeopleView';
import { ChatView } from '../../../src/pages';

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  const mockUseRef = jest.fn();
  return {...originalModule, useRef: mockUseRef};
});

const handleConnect = jest.fn();
const handleDisconnect = jest.fn();
const handleRoomInputChange = jest.fn();
const handleRoomChange = jest.fn();
const handleMessageInputChange = jest.fn();
const handleMessageSend = jest.fn();
const handlePeopleTabChange = jest.fn();
const handleFriendClick = jest.fn();
const handleUserClick = jest.fn();
const messagesRef = useRef<HTMLUListElement>(null);
const startPrivateMessage = jest.fn();

const initialProps = {
  authname: "Person",
  room: "5067",
  feedback: "Some message.",
  focusedFriend: null,
  focusedUser: null,
  handleRoomChange,
  handleConnect,
  handleDisconnect,
  handleFriendClick,
  handleMessageInputChange,
  handleMessageSend,
  handlePeopleTabChange,
  handleRoomInputChange,
  handleUserClick,
  loading: false,
  messages: [],
  messagesRef,
  messageToSend: "How goes it?",
  onlineFriends: [],
  peopleTab: "Room",
  roomToEnter: "",
  startPrivateMessage,
  status: "Disconnected",
  twoColumnATheme: "light",
  users: []
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ChatView', () => {
  const wrapper = shallow(<ChatView {...initialProps} />);

  it('displays feedback', () => {
    expect(wrapper.find('p.chat__feedback').text())
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