import type { useRouter } from 'next/navigation';

import { actionTypes } from './types';

const { MESSAGE, MESSAGE_CLEAR, RESET, REGISTER, VERIFY } = actionTypes;

export const message = (message: string) => ({type: MESSAGE, message});

export const messageClear = () => ({type: MESSAGE_CLEAR});

export const reset = () => ({type: RESET});

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
  email:             string,
  password:          string,
  confirmation_code: string,
  router:            ReturnType<typeof useRouter>
) => ({
  type: VERIFY,
  email,
  password,
  confirmation_code,
  router
});
