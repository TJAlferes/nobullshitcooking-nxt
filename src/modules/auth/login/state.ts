import type { useRouter } from 'next/navigation';
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

export const login = (
  email:    string,
  password: string,
  router:   ReturnType<typeof useRouter>
) => ({
  type: LOGIN,
  email,
  password,
  router
});

export const logout = () => ({type: LOGOUT});

// types -----------------------------------------------------------------------

export type State = {
  authname: string;
};

export const actionTypes = {
  AUTHENTICATE:  'AUTHENTICATE',
  LOGIN:         'LOGIN',
  LOGOUT:        'LOGOUT',
} as const;

const { AUTHENTICATE, LOGIN, LOGOUT } = actionTypes;

export type Actions =
| Authenticate
| Login
| Logout;

export type Authenticate = {
  type:     typeof AUTHENTICATE;
  authname: string;
};

export type Login = {
  type:     typeof LOGIN;
  email:    string;
  password: string;
  router:   ReturnType<typeof useRouter>;
};

export type Logout = {
  type: typeof LOGOUT;
};
