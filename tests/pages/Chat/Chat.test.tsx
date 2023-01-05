import { mount } from 'enzyme';
import React from 'react';

import Chat from '../../../src/pages/chat/Chat';
import { ChatView } from '../../../src/pages/chat/view';
import { PeopleView } from '../../../src/pages/chat/PeopleView';

window.scrollTo = jest.fn();

const joinRoom =         jest.fn();
const chatConnect =            jest.fn();
const chatDisconnect =         jest.fn();
const sendMessage =  jest.fn();
const sendPrivateMessage = jest.fn();

const initialProps = {
  authname:      "Person1",
  joinRoom,
  chatConnect,
  chatDisconnect,
  sendMessage,
  sendPrivateMessage,
  message:       "Some message.",
  messages:      [],
  friends: ["Person2"],
  room:          "5067",
  status:        "connected",
  theme:         "light",
  users:         ["Person1", "Person2", "Person3"],
  windowFocused: true,
};

afterEach(() => {
  jest.clearAllMocks();
});

// TO DO: redux store provider
describe('Chat', () => {
  const wrapper = mount(<Chat {...initialProps} />);

  it('should record and display changes to roomToEnter', () => {
    wrapper.find('input[name="change-room-input"]').simulate('change', {target: {name: "change-room-input", value: "5068"}});
    expect(wrapper.find('input[name="change-room-input"]').props().value).toEqual("5068");
  });

  it('should submit roomToEnter', () => {
    wrapper.find('input[name="change-room-input"]').simulate('change', {target: {name: "change-room-input", value: "5068"}});
    wrapper.find('button.change-room-button').simulate('click');
    expect(joinRoom).toHaveBeenCalledTimes(1);
    expect(joinRoom).toHaveBeenCalledWith("5068");
  });

  it('should not submit roomToEnter when no room provided', () => {
    wrapper.find('input[name="change-room-input"]').simulate('change', {target: {name: "change-room-input", value: ""}});
    wrapper.find('button.change-room-button').simulate('click');
    expect(joinRoom).not.toHaveBeenCalled();
  });

  it('should record and display changes to messageToSend', () => {
    wrapper.find('input[name="chat-input"]').simulate('change', {target: {name: "chat-input", value: "BBQ tonight!"}});
    expect(wrapper.find('input[name="chat-input"]').props().value).toEqual("BBQ tonight!");
  });

  it('should submit messageToSend', () => {
    wrapper.find('input[name="chat-input"]').simulate('change', {target: {name: "chat-input", value: "BBQ tonight!"}});
    wrapper.find('input[name="chat-input"]').simulate('keyUp', {key: 'Enter'});
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith("BBQ tonight!");
  });

  it('should submit messageToSend when whispering', () => {
    wrapper.find('input[name="chat-input"]').simulate('change', {target: {name: "chat-input", value: "/w Person2 BBQ tonight?"}});
    wrapper.find('input[name="chat-input"]').simulate('keyUp', {key: 'Enter'});
    expect(sendPrivateMessage).toHaveBeenCalledTimes(1);
    expect(sendPrivateMessage).toHaveBeenCalledWith("BBQ tonight?", "Person2");
  });

  it('should not submit messageToSend when no message provided', () => {
    wrapper.find('input[name="chat-input"]').simulate('change', {target: {name: "chat-input", value: ""}});
    wrapper.find('input[name="chat-input"]').simulate('keyUp', {key: 'Enter'});
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('should change peopleTab when clicked', () => {
    expect(wrapper.find(PeopleView).prop("peopleTab")).toEqual("Room");
    wrapper.find('button.people__tab').simulate('click');
    expect(wrapper.find(PeopleView).prop("peopleTab")).toEqual("Friends");
    wrapper.find('button.people__tab').at(0).simulate('click');
    expect(wrapper.find(PeopleView).prop("peopleTab")).toEqual("Room");
  });

  it('should not focus user in room if self', () => {
    wrapper.find('li.chat__person').at(0).simulate('click');
    expect(wrapper.find(PeopleView).prop("focusedUser")).toEqual(null);
  });

  it('should focus user in room', () => {
    wrapper.find('li.chat__person').at(1).simulate('click');
    expect(wrapper.find(PeopleView).prop("focusedUser")).toEqual("Person2");
  });

  it('should focus online friend', () => {
    wrapper.find('button.people__tab').simulate('click');
    wrapper.find('li.chat__person').simulate('click');
    expect(wrapper.find(PeopleView).prop("focusedFriend")).toEqual("Person2");
  });

  it('should unfocus person and start whisper with their username', () => {
    wrapper.find('button.person-tooltip__start-whisper').simulate('click');
    expect(wrapper.find(ChatView).prop("messageToSend")).toEqual("/w Person2");
  });
});