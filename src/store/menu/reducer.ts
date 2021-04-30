import { actionTypes, IMenuState, MenuActions } from './types';

const { OPEN_LEFT_NAV, CLOSE_LEFT_NAV } = actionTypes;

const initialState: IMenuState = {leftNav: false};

export const menuReducer = (
  state = initialState,
  action: MenuActions
): IMenuState => {
  switch (action.type) {
    case OPEN_LEFT_NAV: return {...state, ...{leftNav: true}};
    case CLOSE_LEFT_NAV: return {...state, ...{leftNav: false}};
    default: return state;
  }
};