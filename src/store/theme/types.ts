export const actionTypes = {
  DARK:  'DARK',
  LIGHT: 'LIGHT'
} as const;

export interface IState {
  theme: string;
}

export type Actions = IDark | ILight;

interface IDark {
  type: typeof actionTypes.DARK
}

interface ILight {
  type: typeof actionTypes.LIGHT
}