import { actionTypes } from './types';

const { OPEN_LEFT_NAV, CLOSE_LEFT_NAV } = actionTypes;

export const openLeftNav = () => ({type: OPEN_LEFT_NAV});

export const closeLeftNav = () => ({type: CLOSE_LEFT_NAV});