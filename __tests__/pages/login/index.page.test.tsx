import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Login from '../../../src/pages/login/index.page';
import { authStaffLogin, authUserLogin } from '../../../src/store/auth/actions';
import mockFn from '../../mockFn';

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const mockedAuthStaffLogin = mockFn(authStaffLogin);  // TO DO
const mockedAuthUserLogin =  mockFn(authUserLogin);

type Actions = typeof mockedAuthStaffLogin | typeof mockedAuthUserLogin;

jest.mock('react-redux', () => ({
  connect:     () => jest.fn(),
  useSelector: jest.fn(fn => fn()),
  useDispatch: (fn: Actions) => jest.fn()
}));

let wrapper: ReactWrapper;

beforeEach(() => {
  useRouter.mockImplementation(() => ({route: "/login", pathname: "/login"}));
  wrapper = mount(<Login />);
});

afterEach(() => {
  //jest.resetModules();
  jest.clearAllMocks();
});

describe('Login', () => {
  it('should record and display changes to email', () => {
    wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: "person@place.com"}});
    expect(wrapper.find('input[name="email"]').props().value).toEqual("person@place.com");
  });

  it('should record and display changes to password', () => {
    wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "secret"}});
    expect(wrapper.find('input[name="password"]').props().value).toEqual("secret");
  });

  it('should submit user login info', () => {
    wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: "person@place.com"}});
    wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "secret"}});
    //wrapper.update();  // not needed I guess
    wrapper.find('#login-button').at(1).simulate('click');
    expect(mockedAuthUserLogin).toBeCalledTimes(1);
  });

  it('should not submit when no email is given', () => {
    wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "secret"}});
    wrapper.find('#login-button').at(1).simulate('click');
    expect(mockedAuthUserLogin).toBeCalledTimes(0);
  });

  it('should not submit when no password is given', () => {
    wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: "person@place.com"}});
    wrapper.find('#login-button').at(1).simulate('click');
    expect(mockedAuthUserLogin).toBeCalledTimes(0);
  });

  it('should not submit when email is less than 5 characters', () => {
    wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: "p@p."}});
    wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "secret"}});
    wrapper.find('#login-button').at(1).simulate('click');
    expect(mockedAuthUserLogin).toBeCalledTimes(0);
  });

  it('should not submit when password is less than 6 characters', () => {
    wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: "person@place.com"}});
    wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "secre"}});
    wrapper.find('#login-button').at(1).simulate('click');
    expect(mockedAuthUserLogin).toBeCalledTimes(0);
  });
});