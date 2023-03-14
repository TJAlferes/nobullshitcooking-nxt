import type { useRouter } from 'next/navigation';  // or useRouter from 'next/router' ?

export const actionTypes = {
  CHECK_STATE:   'CHECK_STATE',
  MESSAGE:       'MESSAGE',
  MESSAGE_CLEAR: 'MESSAGE_CLEAR',
  RESET:         'RESET',
  USER_DISPLAY:  'USER_DISPLAY',
  USER_LOGIN:    'USER_LOGIN',
  USER_LOGOUT:   'USER_LOGOUT',
  USER_REGISTER: 'USER_REGISTER',
  USER_VERIFY:   'USER_VERIFY'
} as const;

export interface IState {
  authname:             string;
  message:              string;
  userIsAuthenticated:  boolean;
}

export type Actions =
ICheckState |
IMessage |
IMessageClear |
IReset |
IUserDisplay | 
IUserRegister |
IUserVerify |
IUserLogin |
IUserLogout;

export interface ICheckState {
  type: typeof actionTypes.CHECK_STATE;
}

export interface IMessage {
  type:    typeof actionTypes.MESSAGE;
  message: string;
}

export interface IMessageClear {
  type: typeof actionTypes.MESSAGE_CLEAR;
}

export interface IReset {
  type: typeof actionTypes.RESET;
}

export interface IUserDisplay {
  type:     typeof actionTypes.USER_DISPLAY;
  authname: string;
}

export interface IUserLogin {
  type:     typeof actionTypes.USER_LOGIN;
  email:    string;
  password: string;
  router:   ReturnType<typeof useRouter>;
}

export interface IUserLogout {
  type: typeof actionTypes.USER_LOGOUT;
}

export interface IUserRegister {
  type:     typeof actionTypes.USER_REGISTER;
  email:    string;
  password: string;
  username: string;
  router:   ReturnType<typeof useRouter>;
}

export interface IUserVerify {
  type:             typeof actionTypes.USER_VERIFY;
  email:            string;
  password:         string;
  confirmationCode: string;
  router:           ReturnType<typeof useRouter>;
}
