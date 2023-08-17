import { HYDRATE }        from 'next-redux-wrapper';  // DITCH IF POSSIBLE
import type { AnyAction } from 'redux';

import { actionTypes, State } from './types';

const {
  MESSAGE,
  MESSAGE_CLEAR,
  RESET,
} = actionTypes;

const initialState: State = {authname: '', message: '', userIsAuthenticated: false};

export const authReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:       return {...state, ...action['payload'].auth};
    case MESSAGE:       return {...state, message: action['message']};
    case MESSAGE_CLEAR: return {...state, message: ''};
    case RESET:
      return {...state, ...initialState};
    default: return state;
  }
};
