import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { Friends } from '../../../src/pages';
import {
  userAcceptFriendship,
  userBlockUser,
  userDeleteFriendship,
  userRejectFriendship,
  userRequestFriendship,
  userUnblockUser
} from '../../../src/store/user/friendship/actions';

const initialProps = {twoColumnATheme: "light"};

const mockedStoreData = {
  auth: {
    authname: "Person"
  },
  data: {
    myFriendships: [
      {user_id: 1, username: "Jack", status: "accepted"},
      {user_id: 2, username: "Jill", status: "accepted"}
    ]
  },
  user: {
    message: "Some message."
  }
};
const mockedSelector = jest.fn(cb => cb(mockedStoreData));
jest
  .spyOn(require("react-redux"), "useSelector")
  .mockImplementation(mockedSelector);

const mockedDispatch = jest.fn();
jest
  .spyOn(require("react-redux"), "useDispatch")
  .mockReturnValue(mockedDispatch);

jest
  .spyOn(require("next/router"), "useRouter")
  .mockImplementation(() => ({route: "/friends", pathname: "/friends"}));

jest.mock('../../../src/components/LeftNav/LeftNav');

window.scrollTo = jest.fn();

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(<Friends {...initialProps} />);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Friends', () => {
  it('should record and display changes to the user to find', () => {
    wrapper.find('input[name="friends-find-input"]').simulate(
      'change',
      {target: {name: "friends-find-input", value: "Person2"}}
    );

    expect(wrapper.find('input[name="friends-find-input"]').props().value)
      .toEqual("Person2");
  });

  it('should submit user to request', () => {
    wrapper.find('input[name="friends-find-input"]').simulate(
      'change',
      {target: {name: "friends-find-input", value: "Person2"}}
    );

    wrapper.find('button[name="friends-find-request"]').simulate('click');

    expect(mockedDispatch).toHaveBeenCalledWith(userRequestFriendship);
  });

  it ('should not send request when no user is given', () => {
    wrapper.find('input[name="friends-find-input"]')
      .simulate('change', {target: {name: "friends-find-input", value: ""}});

    wrapper.find('button[name="friends-find-request"]').simulate('click');

    expect(mockedDispatch).not.toHaveBeenCalledWith(userRequestFriendship);
  });

  it ('should not send request when user given is self', () => {
    wrapper.find('input[name="friends-find-input"]').simulate(
      'change',
      {target: {name: "friends-find-input", value: "Person"}}
    );

    wrapper.find('button[name="friends-find-request"]').simulate('click');

    expect(mockedDispatch).not.toHaveBeenCalledWith(userRequestFriendship);
  });

  it('should submit user to block', () => {
    wrapper.find('input[name="friends-find-input"]').simulate(
      'change',
      {target: {name: "friends-find-input", value: "Person2"}}
    );

    wrapper.find('button[name="friends-find-block"]').simulate('click');

    expect(mockedDispatch).toHaveBeenCalledWith(userBlockUser);
  });

  it ('should not block when no user is given', () => {
    wrapper.find('input[name="friends-find-input"]')
      .simulate('change', {target: {name: "friends-find-input", value: ""}});

    wrapper.find('button[name="friends-find-block"]').simulate('click');

    expect(mockedDispatch).not.toHaveBeenCalledWith(userBlockUser);
  });

  it ('should not block when user given is self', () => {
    wrapper.find('input[name="friends-find-input"]').simulate(
      'change',
      {target: {name: "friends-find-input", value: "Person"}}
    );

    wrapper.find('button[name="friends-find-block"]').simulate('click');

    expect(mockedDispatch).not.toHaveBeenCalledWith(userBlockUser);
  });
});