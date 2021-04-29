export const actionTypes = {
  LEFT_NAV_SHOW: 'LEFT_NAV_SHOW',
  LEFT_NAV_HIDE: 'LEFT_NAV_HIDE',
  MENU_SHADOW_SHOW: 'MENU_SHADOW_SHOW',
  MENU_SHADOW_HIDE: 'MENU_SHADOW_HIDE'
} as const;

/*

State

*/

export interface IMenuState {
  shadow: boolean;
  leftNav: boolean;
}

/*

Actions

*/

export type MenuActions =
  ILeftNavShow |
  ILeftNavHide |
  IMenuShadowShow |
  IMenuShadowHide;

interface ILeftNavShow {
  type: typeof actionTypes.LEFT_NAV_SHOW;
}

interface ILeftNavHide {
  type: typeof actionTypes.LEFT_NAV_HIDE;
}

interface IMenuShadowShow {
  type: typeof actionTypes.MENU_SHADOW_SHOW;
}

interface IMenuShadowHide {
  type: typeof actionTypes.MENU_SHADOW_HIDE;
}