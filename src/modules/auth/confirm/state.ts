import type { useRouter } from 'next/navigation';

// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

export const confirm = (
  confirmation_code: string,
  router:            ReturnType<typeof useRouter>
) => ({
  type: CONFIRM,
  confirmation_code,
  router
});

export const requestResend = (email: string, password: string) => ({
  type: REQUEST_RESEND,
  email,
  password
});

// types -----------------------------------------------------------------------

export const actionTypes = {
  CONFIRM:        'CONFIRM',
  REQUEST_RESEND: 'REQUEST_RESEND'
} as const;

const { CONFIRM, REQUEST_RESEND } = actionTypes;

export type Actions = Confirm | RequestResend;

export type Confirm = {
  type:              typeof actionTypes.CONFIRM;
  confirmation_code: string;
  router:            ReturnType<typeof useRouter>;
};

export type RequestResend = {
  type:     typeof actionTypes.REQUEST_RESEND;
  email:    string;
  password: string;
};
