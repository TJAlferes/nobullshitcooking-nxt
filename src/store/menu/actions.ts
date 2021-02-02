import { actionTypes } from './types';

const { MENU_SHADOW_SHOW, MENU_SHADOW_HIDE } = actionTypes;

export const menuShadowShow = () => ({type: MENU_SHADOW_SHOW});

export const menuShadowHide = () => ({type: MENU_SHADOW_HIDE});