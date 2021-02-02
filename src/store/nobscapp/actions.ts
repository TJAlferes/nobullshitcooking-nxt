import { actionTypes } from './types';

const { NOBSCAPP_WINDOW_FOCUSED } = actionTypes;

export const nobscappWindowFocused = (condition: boolean) => ({
  type: NOBSCAPP_WINDOW_FOCUSED,
  condition
});