import { actionTypes, SearchResponse } from './types';

const { SET_INDEX } = actionTypes;

export const setIndex = (index: string) => ({type: SET_INDEX, index});

export const setFound = (found: SearchResponse) => ({type: SET_FOUND, found});
