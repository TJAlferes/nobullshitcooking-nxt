import { actionTypes } from './types';

const { SEARCH_SET_INDEX } = actionTypes;

export const searchSetIndex = (index: string) => ({
  type: SEARCH_SET_INDEX,
  index
});