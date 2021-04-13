import { authReducer } from '../../../src/store/auth/reducer';
import { actionTypes } from '../../../src/store/auth/types';

const {
  AUTH_MESSAGE_CLEAR,
  AUTH_RESET,
  AUTH_UPDATE_LOCAL_AVATAR,
  AUTH_STAFF_DISPLAY,
  AUTH_STAFF_LOGOUT,
  AUTH_USER_DISPLAY,
  AUTH_USER_LOGOUT
} = actionTypes;

const initialState = {
  authname: '',
  message: '',
  staffIsAuthenticated: false,
  userIsAuthenticated: false
};

// move
const beforeState = {
  authname: 'Spongebob',
  message: '',
  staffIsAuthenticated: false,
  userIsAuthenticated: true
};

describe('auth reducer', () => {
  it('returns initial state', () => {
    expect(authReducer(undefined, {type: AUTH_MESSAGE_CLEAR}))
      .toEqual({
        authname: '',
        message: '',
        staffIsAuthenticated: false,
        userIsAuthenticated: false
      });
  });

  it('handles actions of type AUTH_MESSAGE_CLEAR', () => {
    expect(authReducer({
      authname: '',
      message: 'Incorrect email or password.',
      staffIsAuthenticated: false,
      userIsAuthenticated: false
    }, {type: AUTH_MESSAGE_CLEAR}))
      .toEqual({
        authname: '',
        message: '',
        staffIsAuthenticated: false,
        userIsAuthenticated: false
      });
  });

  it('handles actions of type AUTH_RESET', () => {
    expect(authReducer(beforeState, {type: AUTH_RESET})).toEqual(initialState);
  });

  // change or delete?
  it('handles actions of type AUTH_UPDATE_LOCAL_AVATAR', () => {
    expect(authReducer(beforeState, {
      type: AUTH_UPDATE_LOCAL_AVATAR,
      avatar: 'Spongebob'
    }))
      .toEqual({
        authname: 'Spongebob',
        message: '',
        staffIsAuthenticated: false,
        userIsAuthenticated: true
      });
  });

  // STAFF_DISPLAY

  it('handles actions of type AUTH_STAFF_LOGOUT', () => {
    expect(authReducer(beforeState, {type: AUTH_STAFF_LOGOUT}))
      .toEqual(initialState);
  });

  it('handles actions of type AUTH_USER_DISPLAY', () => {
    expect(authReducer(initialState, {
      type: AUTH_USER_DISPLAY,
      authname: 'Squidward'
    }))
      .toEqual({
        authname: 'Squidward',
        message: '',
        staffIsAuthenticated: false,
        userIsAuthenticated: true
      });
  });

  it('handles actions of type AUTH_USER_LOGOUT', () => {
    expect(authReducer(beforeState, {type: AUTH_USER_LOGOUT}))
      .toEqual(initialState);
  });
});