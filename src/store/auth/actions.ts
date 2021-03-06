import { NextRouter } from 'next/router';

import { actionTypes } from './types';

const {
  AUTH_CHECK_STATE,
  AUTH_MESSAGE,
  AUTH_MESSAGE_CLEAR,
  AUTH_RESET,
  AUTH_UPDATE_LOCAL_AVATAR,
  AUTH_STAFF_DISPLAY,
  AUTH_STAFF_LOGIN,
  AUTH_STAFF_LOGOUT,
  AUTH_USER_DISPLAY,
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,
  AUTH_USER_REGISTER,
  AUTH_USER_VERIFY,
  //AUTH_FACEBOOK_CHECK_STATE,
  //AUTH_FACEBOOK_LOGIN,
  //AUTH_FACEBOOK_LOGOUT,
  //AUTH_GOOGLE_CHECK_STATE,
  //AUTH_GOOGLE_LOGIN,
  //AUTH_GOOGLE_LOGOUT
} = actionTypes;

export const authCheckState = () => ({type: AUTH_CHECK_STATE});

export const authMessage = (message: string) => ({
  type: AUTH_MESSAGE,
  message
});

export const authMessageClear = () => ({type: AUTH_MESSAGE_CLEAR});

export const authReset = () => ({type: AUTH_RESET});

export const authUpdateLocalAvatar = (avatar: string) => ({
  type: AUTH_UPDATE_LOCAL_AVATAR,
  avatar
});

export const authStaffDisplay = (authname: string) => ({
  type: AUTH_STAFF_DISPLAY,
  authname
});

export const authStaffLogin = (email: string, password: string) => ({
  type: AUTH_STAFF_LOGIN,
  email,
  password
});

export const authStaffLogout = () => ({type: AUTH_STAFF_LOGOUT});

export const authUserDisplay = (authname: string) => ({
  type: AUTH_USER_DISPLAY,
  authname
});

export const authUserLogin = (email: string, password: string) => ({
  type: AUTH_USER_LOGIN,
  email,
  password
});

export const authUserLogout = () => ({type: AUTH_USER_LOGOUT});

export const authUserRegister = (
  email: string,
  password: string,
  username: string,
  router: NextRouter
) => ({
  type: AUTH_USER_REGISTER,
  email,
  password,
  username,
  router
});

export const authUserVerify = (
  email: string,
  password: string,
  confirmationCode: string,
  router: NextRouter
) => ({
  type: AUTH_USER_VERIFY,
  email,
  password,
  confirmationCode,
  router
});

//export const authFacebookCheckState = () => ({type: AUTH_FACEBOOK_CHECK_STATE});

//export const authFacebookLogin = () => ({type: AUTH_FACEBOOK_LOGIN});

//export const authFacebookLogout = () => ({type: AUTH_FACEBOOK_LOGOUT});

//export const authGoogleCheckState = () => ({type: AUTH_GOOGLE_CHECK_STATE});

//export const authGoogleLogin = () => ({type: AUTH_GOOGLE_LOGIN});

//export const authGoogleLogout = () => ({type: AUTH_GOOGLE_LOGOUT});