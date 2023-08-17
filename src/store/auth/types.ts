import type { useRouter } from 'next/navigation';

export const actionTypes = {
  MESSAGE:       'MESSAGE',  // MOVE
  MESSAGE_CLEAR: 'MESSAGE_CLEAR',  // MOVE
  RESET:         'RESET',  // ???
  REGISTER:      'REGISTER',
  VERIFY:        'VERIFY'
} as const;

export type State = {
  authname:            string;
  message:             string;
  userIsAuthenticated: boolean;
}

export type Actions =
| Message// MOVE
| MessageClear// MOVE
| Reset

| Register
| Verify
;

export type Message = {
  type:    typeof actionTypes.MESSAGE;
  message: string;
};// MOVE

export type MessageClear = {
  type: typeof actionTypes.MESSAGE_CLEAR;
};// MOVE

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
  type:              typeof actionTypes.VERIFY;
  email:             string;
  password:          string;
  confirmation_code: string;
  router:            ReturnType<typeof useRouter>;
};
