import { actionTypes, IState, Actions } from './types';

const { OPEN_LEFT_NAV, CLOSE_LEFT_NAV } = actionTypes;

const initialState: IState = {leftNav: false};

export const menuReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case OPEN_LEFT_NAV:  return {...state, leftNav: true};
    case CLOSE_LEFT_NAV: return {...state, leftNav: false};
    default:             return state;
  }
};
