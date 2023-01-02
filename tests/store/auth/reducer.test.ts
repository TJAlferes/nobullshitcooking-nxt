import { authReducer } from '../../../src/store/auth/reducer';
import { actionTypes, IAuthState } from '../../../src/store/auth/types';

const { AUTH_MESSAGE_CLEAR, AUTH_RESET, AUTH_UPDATE_LOCAL_AVATAR, AUTH_STAFF_DISPLAY, AUTH_STAFF_LOGOUT, AUTH_USER_DISPLAY, AUTH_USER_LOGOUT } = actionTypes;

const initialState: IAuthState = {
  authname:             '',
  message:              '',
  staffIsAuthenticated: false,
  userIsAuthenticated:  false
};

const beforeState = {
  authname:             'Spongebob',
  message:              '',
  staffIsAuthenticated: false,
  userIsAuthenticated:  true
};

describe('auth reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = authReducer(state, {type: AUTH_MESSAGE_CLEAR});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type AUTH_MESSAGE_CLEAR', () => {
    const state =   {...initialState};
    state.message = 'Incorrect email or password.';
    const reducer = authReducer(state, {type: AUTH_MESSAGE_CLEAR});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type AUTH_RESET', () => {
    expect(authReducer(beforeState, {type: AUTH_RESET})).toEqual(initialState);
  });

  // change or delete?
  /*it('handles actions of type AUTH_UPDATE_LOCAL_AVATAR', () => {
    const reducer = authReducer(beforeState, {type: AUTH_UPDATE_LOCAL_AVATAR, avatar: 'Spongebob'});
    expect(reducer).toEqual(beforeState);
  });*/

  // STAFF_DISPLAY

  it('handles actions of type AUTH_STAFF_LOGOUT', () => {
    expect(authReducer(beforeState, {type: AUTH_STAFF_LOGOUT})).toEqual(initialState);
  });

  it('handles actions of type AUTH_USER_DISPLAY', () => {
    const state =   {...initialState};
    const reducer = authReducer(state, {type: AUTH_USER_DISPLAY, authname: 'Squidward'})
    expect(reducer.authname).toEqual('Squidward');
    expect(reducer.userIsAuthenticated).toEqual(true);
  });

  it('handles actions of type AUTH_USER_LOGOUT', () => {
    expect(authReducer(beforeState, {type: AUTH_USER_LOGOUT})).toEqual(initialState);
  });
});