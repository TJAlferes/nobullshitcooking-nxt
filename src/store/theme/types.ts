export const actionTypes = {
  DARK:  'DARK',
  LIGHT: 'LIGHT'
} as const;

export type State = {
  theme: string;
};

export type Actions = Dark | Light;

type Dark = {
  type: typeof actionTypes.DARK
};

type Light = {
  type: typeof actionTypes.LIGHT
};
