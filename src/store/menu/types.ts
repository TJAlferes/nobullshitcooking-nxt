export const actionTypes = {
  OPEN_LEFT_NAV:  'OPEN_LEFT_NAV',
  CLOSE_LEFT_NAV: 'CLOSE_LEFT_NAV'
} as const;

export interface IState {
  leftNav: boolean;
}

export type Actions = IOpenLeftNav | ICloseLeftNav;

interface IOpenLeftNav {
  type: typeof actionTypes.OPEN_LEFT_NAV;
}

interface ICloseLeftNav {
  type: typeof actionTypes.CLOSE_LEFT_NAV;
}