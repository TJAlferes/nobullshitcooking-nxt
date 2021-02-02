export const actionTypes = {SEARCH_SET_INDEX: 'SEARCH_SET_INDEX'} as const;

/*

State

*/

export interface ISearchState {
  currentIndex: string;
}

/*

Actions

*/

export type ISearchActions = ISetSearchIndex;

interface ISetSearchIndex {
  type: typeof actionTypes.SEARCH_SET_INDEX;
  index: string;
}