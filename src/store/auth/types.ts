import { NextRouter } from 'next/router';

export const actionTypes = {
  AUTH_CHECK_STATE: 'AUTH_CHECK_STATE',
  AUTH_MESSAGE: 'AUTH_MESSAGE',
  AUTH_MESSAGE_CLEAR: 'AUTH_MESSAGE_CLEAR',
  AUTH_RESET: 'AUTH_RESET',
  AUTH_UPDATE_LOCAL_AVATAR: 'AUTH_UPDATE_LOCAL_AVATAR',
  AUTH_STAFF_DISPLAY: 'AUTH_STAFF_DISPLAY',
  AUTH_STAFF_LOGIN: 'AUTH_STAFF_LOGIN',
  AUTH_STAFF_LOGOUT: 'AUTH_STAFF_LOGOUT',
  AUTH_USER_DISPLAY: 'AUTH_USER_DISPLAY',
  AUTH_USER_LOGIN: 'AUTH_USER_LOGIN',
  AUTH_USER_LOGOUT: 'AUTH_USER_LOGOUT',
  AUTH_USER_REGISTER: 'AUTH_USER_REGISTER',
  AUTH_USER_VERIFY: 'AUTH_USER_VERIFY'
} as const;

/*

State

*/

export interface IAuthState {
  authname: string;
  message: string;
  staffIsAuthenticated: boolean;
  userIsAuthenticated: boolean;
}

/*

Actions

*/

export type AuthActions =
IAuthCheckState |
IAuthMessage |
IAuthMessageClear |
IAuthReset |
IAuthUpdateLocalAvatar |
IAuthStaffDisplay |
IAuthStaffLogin |
IAuthStaffLogout |
IAuthUserDisplay | 
IAuthUserRegister |
IAuthUserVerify |
IAuthUserLogin |
IAuthUserLogout;

export interface IAuthCheckState {
  type: typeof actionTypes.AUTH_CHECK_STATE;
}

export interface IAuthMessage {
  type: typeof actionTypes.AUTH_MESSAGE;
  message: string;
}

export interface IAuthMessageClear {
  type: typeof actionTypes.AUTH_MESSAGE_CLEAR;
}

export interface IAuthReset {
  type: typeof actionTypes.AUTH_RESET;
}

export interface IAuthUpdateLocalAvatar {
  type: typeof actionTypes.AUTH_UPDATE_LOCAL_AVATAR;
  avatar: string
}

export interface IAuthStaffDisplay {
  type: typeof actionTypes.AUTH_STAFF_DISPLAY;
  authname: string;
}

export interface IAuthStaffLogin {
  type: typeof actionTypes.AUTH_STAFF_LOGIN;
  email: string;
  password: string;
}

export interface IAuthStaffLogout {
  type: typeof actionTypes.AUTH_STAFF_LOGOUT;
}

export interface IAuthUserDisplay {
  type: typeof actionTypes.AUTH_USER_DISPLAY;
  authname: string;
}

export interface IAuthUserLogin {
  type: typeof actionTypes.AUTH_USER_LOGIN;
  email: string;
  password: string;
}

export interface IAuthUserLogout {
  type: typeof actionTypes.AUTH_USER_LOGOUT;
}

export interface IAuthUserRegister {
  type: typeof actionTypes.AUTH_USER_REGISTER;
  email: string;
  password: string;
  username: string;
  router: NextRouter;
}

export interface IAuthUserVerify {
  type: typeof actionTypes.AUTH_USER_VERIFY;
  email: string;
  password: string;
  confirmationCode: string;
  router: NextRouter;
}