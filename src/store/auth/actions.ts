import type { NextRouter } from 'next/router';

import { actionTypes } from './types';

const {
  CHECK_STATE, RESET, MESSAGE, MESSAGE_CLEAR, UPDATE_LOCAL_AVATAR,
  STAFF_DISPLAY, STAFF_LOGIN, STAFF_LOGOUT,
  USER_DISPLAY, USER_LOGIN, USER_LOGOUT,
  USER_REGISTER, USER_VERIFY
} = actionTypes;

export const checkState = () => ({type: CHECK_STATE});
export const reset =      () => ({type: RESET});

export const message =      (message: string) => ({type: MESSAGE, message});
export const messageClear = () =>                ({type: MESSAGE_CLEAR});

export const updateLocalAvatar = (avatar: string) => ({type: UPDATE_LOCAL_AVATAR, avatar});

export const staffDisplay = (authname: string) =>                ({type: STAFF_DISPLAY, authname});
export const staffLogin =   (email: string, password: string) => ({type: STAFF_LOGIN, email, password});
export const staffLogout =  () =>                                ({type: STAFF_LOGOUT});

export const userDisplay = (authname: string) =>                ({type: USER_DISPLAY, authname});
export const userLogin =   (email: string, password: string) => ({type: USER_LOGIN, email, password});
export const userLogout =  () =>                                ({type: USER_LOGOUT});

export const userRegister = (email: string, password: string, username: string, router: NextRouter) =>
  ({type: USER_REGISTER, email, password, username, router});

export const userVerify = (email: string, password: string, confirmationCode: string, router: NextRouter) =>
  ({type: USER_VERIFY, email, password, confirmationCode, router});
