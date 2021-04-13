import { shallow } from 'enzyme';
import React, { useRef } from 'react';

import {
  MessagesView
} from '../../../../src/pages/Chat/MessagesView/MessagesView';
import { PRIVATE, PUBLIC } from '../../../../src/store/chat/types';

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  const mockUseRef = jest.fn();
  return {...originalModule, useRef: mockUseRef};
});

const handleMessageInputChange = jest.fn();
const handleMessageSend = jest.fn();
const messagesRef = useRef<HTMLUListElement>(null);

const initialProps = {
  authname: "Person",
  handleMessageInputChange,
  handleMessageSend,
  messages: [
    {
      kind: PUBLIC,
      id: "1",
      to: "5067",
      from: {userId: "1", username: "messengerstatus"},
      text: "Some status.",
      ts: "sometime"
    },
    {
      kind: PUBLIC,
      id: "2",
      to: "5067",
      from: {userId: "150", username: "Person"},
      text: "Hey all!",
      ts: "sometime"
    },
    {
      kind: PUBLIC,
      id: "3",
      to: "5067",
      from: {userId: "149", username: "Person2"},
      text: "Hey there!",
      ts: "sometime"
    },
    {
      kind: PRIVATE,
      id: "4",
      to: "Person2",
      from: {userId: "150", username: "Person"},
      text: "You good?",
      ts: "sometime"
    },
    {
      kind: PRIVATE,
      id: "5",
      to: "Person",
      from: {userId: "149", username: "Person2"},
      text: "Yes",
      ts: "sometime"
    }
  ],
  messagesRef,
  messageToSend: "brb real quick",
  status: "Online"
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('MessagesView', () => {
  const wrapper = shallow(<MessagesView {...initialProps} />);

  it(`
    displays a ul element
    with className chat__messages and
    with messagesRef as ref
  `, () => {
    expect(wrapper.find('ul.chat__message-list').prop('ref'))
      .toEqual(messagesRef);
  });

  it (`
    displays a starting message: a span element
    with className message__admin and
    with text 'COOK EAT WIN REPEAT'
  `, () => {
    expect(wrapper.find('span.message__admin').at(0).text())
    .toEqual('COOK EAT WIN REPEAT');
  });

  describe('when messages contain a status message', () => {
    it(`
      displays a span element
      with className message__admin and
      with text 'Some status.'
    `, () => {
      expect(wrapper.find('span.message__admin').at(1).text())
      .toEqual('Some status.');
    });
  });

  describe('when messages contain a sent public message', () => {
    it(`
      displays a span element
      with className message__self and
      with text 'Person: '
    `, () => {
      expect(wrapper.find('span.message__self').at(0).text())
      .toEqual('Person: ');
    });

    it(`
      displays an li element
      with className chat__message
      with text 'sometime Person: Hey all!'
    `, () => {
      expect(wrapper.find('li.chat__message').at(2).text())
      .toEqual('sometime Person: Hey all!');
    });
  });

  describe('when messages contain a received public message', () => {
    it(`
      displays a span element
      with className message__other and
      with text 'Person2: '
    `, () => {
      expect(wrapper.find('span.message__other').at(0).text())
      .toEqual('Person2: ');
    });

    it(`
      displays an li element
      with className chat__message
      with text 'sometime Person2: Hey there!'
    `, () => {
      expect(wrapper.find('li.chat__message').at(3).text())
      .toEqual('sometime Person2: Hey there!');
    });
  });

  describe('when messages contain a sent private message', () => {
    it(`
      displays a span element
      with className message__self
      and text 'You whisper to Person2: '
    `, () => {
      expect(wrapper.find('span.message__self').at(1).text())
      .toEqual('You whisper to Person2: ');
    });

    it(`
      displays a span
      with className message__private
      and text You good?
    `, () => {
      expect(wrapper.find('span.message__private').at(0).text())
      .toEqual('You good?');
    });
  });

  describe('when messages contain a received private message', () => {
    it(`
      displays a span element
      with className message__other
      with text 'Person2 whispers to you: '
    `, () => {
      expect(wrapper.find('span.message__other').at(1).text())
      .toEqual('Person2 whispers to you: ');
    });

    it('displays a span with className message__private and text Yes', () => {
      expect(wrapper.find('span.message__private').at(1).text()).toEqual('Yes');
    });
  });

  it('displays an input element with value brb real quick', () => {
    expect(wrapper.find('input').prop('value')).toEqual('brb real quick');
  });
});