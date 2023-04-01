import { actionTypes, State, Actions } from './types';

const { LEFT_NAV } = actionTypes;

const initialState: State = {leftNav: false};

export const menuReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case LEFT_NAV:  return {...state, leftNav: !state.leftNav};
    default:        return state;
  }
};
