import type { useRouter } from 'next/navigation';

// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

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

// types -----------------------------------------------------------------------

export const actionTypes = {

  VERIFY:        'VERIFY'
} as const;

const { VERIFY } = actionTypes;

export type Actions = Verify;

export type Verify = {
  type:              typeof actionTypes.VERIFY;
  email:             string;
  password:          string;
  confirmation_code: string;
  router:            ReturnType<typeof useRouter>;
};
