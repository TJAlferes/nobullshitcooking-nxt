import { actionTypes, IState, Actions } from './types';

const { DARK, LIGHT } = actionTypes;

const initialState: IState = {theme: "light"};

export const themeReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case DARK:  return {...state, theme: "dark"};
    case LIGHT: return {...state, theme: "light"};
    default:    return state;
  }
};
