import { actionTypes, IMenuState, MenuActions } from './types';

const {
  LEFT_NAV_SHOW,
  LEFT_NAV_HIDE,
  MENU_SHADOW_SHOW,
  MENU_SHADOW_HIDE
} = actionTypes;

const initialState: IMenuState = {leftNav: false, shadow: false};

export const menuReducer = (
  state = initialState,
  action: MenuActions
): IMenuState => {
  switch (action.type) {
    case LEFT_NAV_SHOW: return {...state, ...{leftNav: true}};
    case LEFT_NAV_HIDE: return {...state, ...{leftNav: false}};
    case MENU_SHADOW_SHOW: return {...state, ...{shadow: true}};
    case MENU_SHADOW_HIDE: return {...state, ...{shadow: false}};
    default: return state;
  }
};