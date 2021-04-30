export const actionTypes = {
  OPEN_LEFT_NAV: 'OPEN_LEFT_NAV',
  CLOSE_LEFT_NAV: 'CLOSE_LEFT_NAV'
} as const;

/*

State

*/

export interface IMenuState {
  leftNav: boolean;
}

/*

Actions

*/

export type MenuActions = IOpenLeftNav | ICloseLeftNav;

interface IOpenLeftNav {
  type: typeof actionTypes.OPEN_LEFT_NAV;
}

interface ICloseLeftNav {
  type: typeof actionTypes.CLOSE_LEFT_NAV;
}