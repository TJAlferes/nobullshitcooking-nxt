export const actionTypes = {
  LEFT_NAV:  'LEFT_NAV'
} as const;

export interface IState {
  leftNav: boolean;
}

export type Actions = IToggleLeftNav;

interface IToggleLeftNav {
  type: typeof actionTypes.LEFT_NAV;
}
