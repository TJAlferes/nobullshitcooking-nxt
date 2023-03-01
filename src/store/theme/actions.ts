import { actionTypes } from './types';

const { DARK, LIGHT } = actionTypes;

export const dark =  () => ({type: DARK});
export const light = () => ({type: LIGHT});
