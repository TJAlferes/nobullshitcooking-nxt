export const actionTypes = {
  LEFT_NAV: 'LEFT_NAV'
} as const;

export type State = {
  leftNav: boolean;
}

export type Actions = ToggleLeftNav;

type ToggleLeftNav = {
  type: typeof actionTypes.LEFT_NAV;
}
