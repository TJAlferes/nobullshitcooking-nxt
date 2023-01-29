import { authReducer } from '../../../src/store/auth/reducer';
import { actionTypes, IState } from '../../../src/store/auth/types';

const { MESSAGE_CLEAR, RESET, UPDATE_LOCAL_AVATAR, STAFF_DISPLAY, STAFF_LOGOUT, USER_DISPLAY, USER_LOGOUT } = actionTypes;

const initialState: IState = {
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
    const reducer = authReducer(state, {type: MESSAGE_CLEAR});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type MESSAGE_CLEAR', () => {
    const state =   {...initialState};
    state.message = 'Incorrect email or password.';
    const reducer = authReducer(state, {type: MESSAGE_CLEAR});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type RESET', () => {
    expect(authReducer(beforeState, {type: RESET})).toEqual(initialState);
  });

  // change or delete?
  /*it('handles actions of type UPDATE_LOCAL_AVATAR', () => {
    const reducer = authReducer(beforeState, {type: UPDATE_LOCAL_AVATAR, avatar: 'Spongebob'});
    expect(reducer).toEqual(beforeState);
  });*/

  // STAFF_DISPLAY

  it('handles actions of type STAFF_LOGOUT', () => {
    expect(authReducer(beforeState, {type: STAFF_LOGOUT})).toEqual(initialState);
  });

  it('handles actions of type USER_DISPLAY', () => {
    const state =   {...initialState};
    const reducer = authReducer(state, {type: USER_DISPLAY, authname: 'Squidward'})
    expect(reducer.authname).toEqual('Squidward');
    expect(reducer.userIsAuthenticated).toEqual(true);
  });

  it('handles actions of type USER_LOGOUT', () => {
    expect(authReducer(beforeState, {type: USER_LOGOUT})).toEqual(initialState);
  });
});