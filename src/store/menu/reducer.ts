import { actionTypes, IState, Actions } from './types';

const { LEFT_NAV } = actionTypes;

const initialState: IState = {leftNav: false};

export const menuReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case LEFT_NAV:  return {...state, leftNav: !state.leftNav};
    default:        return state;
  }
};
