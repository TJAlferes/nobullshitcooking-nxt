import { actionTypes } from './types';

const { WINDOW_FOCUSED } = actionTypes;

export const windowFocused = (condition: boolean) => ({type: WINDOW_FOCUSED, condition});