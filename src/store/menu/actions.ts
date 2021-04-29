import { actionTypes } from './types';

const {
  LEFT_NAV_SHOW,
  LEFT_NAV_HIDE,
  MENU_SHADOW_SHOW,
  MENU_SHADOW_HIDE
} = actionTypes;

export const leftNavShow = () => ({type: LEFT_NAV_SHOW});

export const leftNavHide = () => ({type: LEFT_NAV_HIDE});

export const menuShadowShow = () => ({type: MENU_SHADOW_SHOW});

export const menuShadowHide = () => ({type: MENU_SHADOW_HIDE});