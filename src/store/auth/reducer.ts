import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import { actionTypes, IState } from './types';

const {
  MESSAGE,
  MESSAGE_CLEAR,
  RESET,
  STAFF_DISPLAY,
  STAFF_LOGOUT,
  USER_DISPLAY,
  USER_LOGOUT
} = actionTypes;

const initialState: IState = {authname: '', message: '', staffIsAuthenticated: false, userIsAuthenticated: false};

export const authReducer = (state = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case HYDRATE:             return {...state, ...action['payload'].auth};
    case MESSAGE:             return {...state, message: action['message']};
    case MESSAGE_CLEAR:       return {...state, message: ''};
    case STAFF_DISPLAY:       return {...state, staffIsAuthenticated: true, authname: action['authname']};
    case USER_DISPLAY:        return {...state, userIsAuthenticated: true, authname: action['authname']};
    case RESET:
    case USER_LOGOUT:
    case STAFF_LOGOUT:
      return {...state, ...initialState};
    default: return state;
  }
};