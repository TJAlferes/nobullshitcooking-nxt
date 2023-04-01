import { actionTypes, State, Actions } from './types';

const { DARK, LIGHT } = actionTypes;

const initialState: State = {theme: "light"};

export const themeReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case DARK:  return {...state, theme: "dark"};
    case LIGHT: return {...state, theme: "light"};
    default:    return state;
  }
};
