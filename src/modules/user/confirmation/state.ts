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

// types -----------------------------------------------------------------------

export const actionTypes = {CONFIRM: 'CONFIRM'} as const;

const { CONFIRM } = actionTypes;

export type Actions = Confirm;

export type Confirm = {
  type:              typeof actionTypes.CONFIRM;
  confirmation_code: string;
  router:            ReturnType<typeof useRouter>;
};
