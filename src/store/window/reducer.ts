import { actionTypes, IState, Actions } from './types';

const { FOCUSED } = actionTypes;

const initialState: IState = {focused: true};

export const windowReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case FOCUSED: return {...state, focused: action.focused};
    default:      return state;
  }
};
