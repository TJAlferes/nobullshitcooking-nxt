export const actionTypes = {
  MENU_SHADOW_SHOW: 'MENU_SHADOW_SHOW',
  MENU_SHADOW_HIDE: 'MENU_SHADOW_HIDE'
} as const;

/*

State

*/

export interface IMenuState {
  shadow: boolean
}

/*

Actions

*/

export type MenuActions = IMenuShadowShow|IMenuShadowHide;

interface IMenuShadowShow {
  type: typeof actionTypes.MENU_SHADOW_SHOW
}

interface IMenuShadowHide {
  type: typeof actionTypes.MENU_SHADOW_HIDE
}