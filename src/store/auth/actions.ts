import type { useRouter } from 'next/navigation';

import { actionTypes } from './types';

const { MESSAGE, MESSAGE_CLEAR, RESET, AUTHENTICATE, LOGIN, LOGOUT, REGISTER, VERIFY } = actionTypes;

export const message = (message: string) => ({type: MESSAGE, message});

export const messageClear = () => ({type: MESSAGE_CLEAR});

export const reset = () => ({type: RESET});

export const authenticate = (authname: string) => ({type: AUTHENTICATE, authname});

export const register = (
  email:    string,
  password: string,
  username: string,
  router:   ReturnType<typeof useRouter>
) => ({
  type: REGISTER,
  email,
  password,
  username,
  router
});

export const verify = (
  email:            string,
  password:         string,
  confirmationCode: string,
  router:           ReturnType<typeof useRouter>
) => ({
  type: VERIFY,
  email,
  password,
  confirmationCode,
  router
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
