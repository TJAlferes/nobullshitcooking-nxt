import { shallow } from 'enzyme';
import React from 'react';

import { PeopleView } from '../../../src/pages/chat/PeopleView';

const changePeopleTab = jest.fn();
const focusFriend = jest.fn();
const focusUser = jest.fn();
const startPrivateMessage = jest.fn();

const initialProps = {
  changePeopleTab,
  focusFriend,
  focusUser,
  onlineFriends: [{userId: "151", username: "Person2"}],
  startPrivateMessage,
  users: [
    {userId: "150", username: "Person"},
    {userId: "151", username: "Person2"},
    {userId: "152", username: "Person3"}
  ]
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('PeopleView', () => {
  
  describe('when peopleTab is Room', () => {
    const wrapper = shallow(
      <PeopleView
        focusedFriend={null}
        focusedUser={null}
        peopleTab="Room"
        {...initialProps}
      />
    );

    it(`
      displays a button element
      with className people-tab--current and
      with text 'Room'
    `, () => {
      expect(wrapper.find('button.people-tab--current').text()).toEqual('Room');
    });

    it(`
      displays a ul element
      with className chat-persons and
    `, () => {
      expect(wrapper.find('ul.chat-persons')).toHaveLength(1);
    });

    it(`
      displays a li element
      with className chat-person and
      with key 'Person'
    `, () => {
      expect(wrapper.find('li.chat-person').at(0).key()).toEqual('Person');
    });

    it(`
      displays a li element
      with className chat-person and
      with key 'Person2'
    `, () => {
      expect(wrapper.find('li.chat-person').at(1).key()).toEqual('Person2');
    });

    it(`
      displays a li element
      with className chat-person and
      with key 'Person3'
    `, () => {
      expect(wrapper.find('li.chat-person').at(2).key()).toEqual('Person3');
    });

    describe('when user in room is focused', () => {
      const wrapper = shallow(
        <PeopleView
          focusedFriend={null}
          focusedUser="Person2"
          peopleTab="Room"
          {...initialProps}
        />
      );

      it(`
        displays a button element
        with className person-tooltip__button and
        with text 'Whisper'
      `, () => {
        expect(wrapper.find('button.person-tooltip__button').text())
          .toEqual('Whisper');
      });
    });

  });

  describe('when peopleTab is Friends', () => {
    const wrapper = shallow(
      <PeopleView
        focusedFriend={null}
        focusedUser={null}
        peopleTab="Friends"
        {...initialProps}
      />
    );

    it(`
      displays a button element
      with className people-tab--current and
      with text 'Friends'
    `, () => {
      expect(wrapper.find('button.people-tab--current').text())
        .toEqual('Friends');
    });

    it(`
      displays a ul element
      with className chat-persons and
    `, () => {
      expect(wrapper.find('ul.chat-persons')).toHaveLength(1);
    });

    it(`
      displays a li element
      with className chat-person and
      with key 'Person2'
    `, () => {
      expect(wrapper.find('li.chat-person').key()).toEqual('Person2');
    });

    describe('when online friend is focused', () => {
      const wrapper = shallow(
        <PeopleView
          focusedFriend="Person2"
          focusedUser={null}
          peopleTab="Friends"
          {...initialProps}
        />
      );

      it(`
        displays a button element
        with className person-tooltip__button and
        with text 'Whisper'
      `, () => {
        expect(wrapper.find('button.person-tooltip__button').text())
          .toEqual('Whisper');
      });
    });

  });

});