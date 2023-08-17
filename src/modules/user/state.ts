import type { useRouter } from 'next/navigation';

// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

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

// types -----------------------------------------------------------------------

export const actionTypes = {REGISTER: 'REGISTER'} as const;

const { REGISTER } = actionTypes;

export type Actions = Register;

export type Register = {
  type:     typeof actionTypes.REGISTER;
  email:    string;
  password: string;
  username: string;
  router:   ReturnType<typeof useRouter>;
};
