import { actionTypes } from './types';

const { FOCUSED } = actionTypes;

export const focused = (focused: boolean) => ({type: FOCUSED, focused});
