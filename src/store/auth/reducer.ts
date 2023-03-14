import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import { actionTypes, IState } from './types';

const {
  MESSAGE,
  MESSAGE_CLEAR,
  RESET,
  USER_DISPLAY,
  USER_LOGOUT
} = actionTypes;

const initialState: IState = {authname: '', message: '', userIsAuthenticated: false};

export const authReducer = (state = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case HYDRATE:             return {...state, ...action['payload'].auth};
    case MESSAGE:             return {...state, message: action['message']};
    case MESSAGE_CLEAR:       return {...state, message: ''};
    case USER_DISPLAY:        return {...state, userIsAuthenticated: true, authname: action['authname']};
    case RESET:
    case USER_LOGOUT:
      return {...state, ...initialState};
    default: return state;
  }
};