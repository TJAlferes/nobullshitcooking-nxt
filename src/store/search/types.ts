export const actionTypes = {SET_INDEX: 'SET_INDEX'} as const;

export interface IState {
  index: string;
}

export type IActions = ISetIndex;

interface ISetIndex {
  type:  typeof actionTypes.SET_INDEX;
  index: string;
}