import type { useRouter } from 'next/navigation';

export const actionTypes = {
  MESSAGE:       'MESSAGE',
  MESSAGE_CLEAR: 'MESSAGE_CLEAR',
  RESET:         'RESET',
  AUTHENTICATE:  'AUTHENTICATE',
  REGISTER:      'REGISTER',
  VERIFY:        'VERIFY',
  LOGIN:         'LOGIN',
  LOGOUT:        'LOGOUT',
} as const;

export type State = {
  authname:            string;
  message:             string;
  userIsAuthenticated: boolean;
}

export type Actions =
| Message
| MessageClear
| Reset
| Authenticate
| Register
| Verify
| Login
| Logout;

export type Message = {
  type:    typeof actionTypes.MESSAGE;
  message: string;
};

export type MessageClear = {
  type: typeof actionTypes.MESSAGE_CLEAR;
};

export type Reset = {
  type: typeof actionTypes.RESET;
};

// TO DO: move shared types to one location

export type Authenticate = {
  type:     typeof actionTypes.AUTHENTICATE;
  authname: string;
};

export type Login = {
  type:     typeof actionTypes.LOGIN;
  email:    string;
  password: string;
  router:   ReturnType<typeof useRouter>;
};

export type Logout = {
  type: typeof actionTypes.LOGOUT;
};

export type Register = {
  type:     typeof actionTypes.REGISTER;
  email:    string;
  password: string;
  username: string;
  router:   ReturnType<typeof useRouter>;
};

export type Verify = {
  type:             typeof actionTypes.VERIFY;
  email:            string;
  password:         string;
  confirmationCode: string;
  router:           ReturnType<typeof useRouter>;
};
