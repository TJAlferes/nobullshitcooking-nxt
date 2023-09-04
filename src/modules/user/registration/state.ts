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

export const updateEmail = (
  new_email: string,
  router:    ReturnType<typeof useRouter>
) => ({
  type: UPDATE_EMAIL,
  new_email,
  router
});

export const updatePassword = (
  new_password: string,
  router:       ReturnType<typeof useRouter>
) => ({
  type: UPDATE_PASSWORD,
  new_password,
  router
});

export const updateUsername = (
  new_username: string,
  router:       ReturnType<typeof useRouter>
) => ({
  type: UPDATE_USERNAME,
  new_username,
  router
});

export const deleteAccount = (router:   ReturnType<typeof useRouter>) => ({
  type: DELETE_ACCOUNT,
  router
});

// types -----------------------------------------------------------------------

export const actionTypes = {
  REGISTER:        'REGISTER',
  UPDATE_EMAIL:    'UPDATE_EMAIL',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_USERNAME: 'UPDATE_USERNAME',
  DELETE_ACCOUNT:  'DELETE_ACCOUNT'
} as const;

const {
  REGISTER,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  DELETE_ACCOUNT
} = actionTypes;

export type Actions = Register;

export type Register = {
  type:     typeof actionTypes.REGISTER;
  email:    string;
  password: string;
  username: string;
  router:   ReturnType<typeof useRouter>;
};

export type UpdateEmail = {
  type:      typeof actionTypes.UPDATE_EMAIL;
  new_email: string;
  router:    ReturnType<typeof useRouter>;
};

export type UpdatePassword = {
  type:         typeof actionTypes.UPDATE_PASSWORD;
  new_password: string;
  router:       ReturnType<typeof useRouter>;
};

export type UpdateUsername = {
  type:         typeof actionTypes.UPDATE_USERNAME;
  new_username: string;
  router:       ReturnType<typeof useRouter>;
};

export type DeleteAccount = {
  type:   typeof actionTypes.DELETE_ACCOUNT;
  router: ReturnType<typeof useRouter>;
};
