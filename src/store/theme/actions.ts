import { actionTypes } from './types';

const { THEME_DARK_TRIGGER, THEME_LIGHT_TRIGGER } = actionTypes;

export const themeDarkTrigger =  () => ({type: THEME_DARK_TRIGGER});
export const themeLightTrigger = () => ({type: THEME_LIGHT_TRIGGER});