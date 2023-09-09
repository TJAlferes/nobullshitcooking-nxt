import { HYDRATE }        from 'next-redux-wrapper';  // DITCH IF POSSIBLE
import type { AnyAction } from 'redux';

// reducer ---------------------------------------------------------------------

const initialState: State = {
  authname: ''  // username of authenticated user
};

export function authenticationReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case HYDRATE:      return {...state, ...action['payload'].auth};
    case AUTHENTICATE: return {...state, authname: action['authname']};
    //case RESET:
    case LOGOUT:
      return {...state, ...initialState};
    default: return state;
  }
};

// action creators -------------------------------------------------------------

export const authenticate = (authname: string) => ({
  type: AUTHENTICATE,
  authname
});

// types -----------------------------------------------------------------------

export type State = {
  authname: string;
};

export const actionTypes = {
  AUTHENTICATE:  'AUTHENTICATE'
} as const;

const { AUTHENTICATE } = actionTypes;

export type Actions = Authenticate;

export type Authenticate = {
  type:     typeof AUTHENTICATE;
  authname: string;
};
