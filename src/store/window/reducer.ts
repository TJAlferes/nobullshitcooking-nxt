import { actionTypes, State, Actions } from './types';

const { FOCUSED } = actionTypes;

const initialState: State = {focused: true};

export const windowReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case FOCUSED: return {...state, focused: action.focused};
    default:      return state;
  }
};
