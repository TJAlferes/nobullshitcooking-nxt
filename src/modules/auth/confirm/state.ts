

// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

export const requestResend = (email: string, password: string) => ({
  type: REQUEST_RESEND,
  email,
  password
});

// types -----------------------------------------------------------------------

export const actionTypes = {
  REQUEST_RESEND: 'REQUEST_RESEND'
} as const;

const { REQUEST_RESEND } = actionTypes;

export type Actions = RequestResend;


export type RequestResend = {
  type:     typeof actionTypes.REQUEST_RESEND;
  email:    string;
  password: string;
};
