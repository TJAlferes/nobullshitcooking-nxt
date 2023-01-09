import { actionTypes, IState, Actions } from './types';

const { WINDOW_FOCUSED } = actionTypes;

// TO DO: make false first, have them click on something (Connect button?)
const initialState: IState = {windowFocused: true};

export const nobscappReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case WINDOW_FOCUSED: return {...state, ...{windowFocused: action.condition}};
    default:             return state;
  }
};