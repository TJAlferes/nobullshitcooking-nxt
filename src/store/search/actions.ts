import { actionTypes } from './types';

const { SET_INDEX } = actionTypes;

export const setIndex = (index: string) => ({type: SET_INDEX, index});