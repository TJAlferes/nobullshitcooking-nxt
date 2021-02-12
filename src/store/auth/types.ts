import { NextRouter } from 'next/router';

export const actionTypes = {
  AUTH_CHECK_STATE: 'AUTH_CHECK_STATE',
  AUTH_MESSAGE_CLEAR: 'AUTH_MESSAGE_CLEAR',
  AUTH_RESET: 'AUTH_RESET',
  AUTH_UPDATE_LOCAL_AVATAR: 'AUTH_UPDATE_LOCAL_AVATAR',
  AUTH_STAFF_DISPLAY: 'AUTH_STAFF_DISPLAY',
  AUTH_STAFF_LOGIN: 'AUTH_STAFF_LOGIN',
  AUTH_STAFF_LOGIN_FAILED: 'AUTH_STAFF_LOGIN_FAILED',
  AUTH_STAFF_LOGOUT: 'AUTH_STAFF_LOGOUT',
  AUTH_STAFF_LOGOUT_FAILED: 'AUTH_STAFF_LOGOUT_FAILED',
  AUTH_USER_DISPLAY: 'AUTH_USER_DISPLAY',
  AUTH_USER_LOGIN: 'AUTH_USER_LOGIN',
  AUTH_USER_LOGIN_FAILED: 'AUTH_USER_LOGIN_FAILED',
  AUTH_USER_LOGOUT: 'AUTH_USER_LOGOUT',
  AUTH_USER_LOGOUT_FAILED: 'AUTH_USER_LOGOUT_FAILED',
  AUTH_USER_REGISTER: 'AUTH_USER_REGISTER',
  AUTH_USER_REGISTER_FAILED: 'AUTH_USER_REGISTER_FAILED',
  AUTH_USER_VERIFY: 'AUTH_USER_VERIFY',
  AUTH_USER_VERIFY_FAILED: 'AUTH_USER_VERIFY_FAILED',
  //AUTH_FACEBOOK_CHECK_STATE: 'AUTH_FACEBOOK_CHECK_STATE',
  //AUTH_FACEBOOK_LOGIN: 'AUTH_FACEBOOK_LOGIN',
  //AUTH_FACEBOOK_LOGOUT: 'AUTH_FACEBOOK_LOGOUT',
  //AUTH_GOOGLE_CHECK_STATE: 'AUTH_GOOGLE_CHECK_STATE',
  //AUTH_GOOGLE_LOGIN: 'AUTH_GOOGLE_LOGIN',
  //AUTH_GOOGLE_LOGOUT: 'AUTH_GOOGLE_LOGOUT',
} as const;

/*

State

*/

export interface IAuthState {
  authname: string;
  avatar: string;
  message: string;
  staffIsAuthenticated: boolean;
  userIsAuthenticated: boolean;
}

/*

Actions

*/

export type AuthActions =
IAuthCheckState |
IAuthMessageClear |
IAuthReset |
IAuthUpdateLocalAvatar |
IAuthStaffDisplay |
IAuthStaffLogin |
IAuthStaffLoginFailed |
IAuthStaffLogout |
IAuthStaffLogoutFailed |
IAuthUserDisplay | 
IAuthUserRegister |
IAuthUserRegisterFailed |
IAuthUserVerify |
IAuthUserVerifyFailed |
IAuthUserLogin |
IAuthUserLoginFailed |
IAuthUserLogout |
IAuthUserLogoutFailed;

export interface IAuthCheckState {
  type: typeof actionTypes.AUTH_CHECK_STATE;
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
  avatar: string;
}

export interface IAuthStaffLogin {
  type: typeof actionTypes.AUTH_STAFF_LOGIN;
  email: string;
  password: string;
}

export interface IAuthStaffLoginFailed {
  type: typeof actionTypes.AUTH_STAFF_LOGIN_FAILED;
  message: string;
}

export interface IAuthStaffLogout {
  type: typeof actionTypes.AUTH_STAFF_LOGOUT;
}

export interface IAuthStaffLogoutFailed {
  type: typeof actionTypes.AUTH_STAFF_LOGOUT_FAILED;
  message: string;
}

export interface IAuthUserDisplay {
  type: typeof actionTypes.AUTH_USER_DISPLAY;
  authname: string;
  avatar: string;
}

export interface IAuthUserLogin {
  type: typeof actionTypes.AUTH_USER_LOGIN;
  email: string;
  password: string;
}

export interface IAuthUserLoginFailed {
  type: typeof actionTypes.AUTH_USER_LOGIN_FAILED;
  message: string;
}

export interface IAuthUserLogout {
  type: typeof actionTypes.AUTH_USER_LOGOUT;
}

export interface IAuthUserLogoutFailed {
  type: typeof actionTypes.AUTH_USER_LOGOUT_FAILED;
  message: string;
}

export interface IAuthUserRegister {
  type: typeof actionTypes.AUTH_USER_REGISTER;
  email: string;
  password: string;
  username: string;
  router: NextRouter;
}

export interface IAuthUserRegisterFailed {
  type: typeof actionTypes.AUTH_USER_REGISTER_FAILED;
  message: string;
}

export interface IAuthUserVerify {
  type: typeof actionTypes.AUTH_USER_VERIFY;
  email: string;
  password: string;
  confirmationCode: string;
  router: NextRouter;
}

export interface IAuthUserVerifyFailed {
  type: typeof actionTypes.AUTH_USER_VERIFY_FAILED;
  message: string;
}