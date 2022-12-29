import { actionTypes, INOBSCAppState, NOBSCAppActions } from './types';

const { NOBSCAPP_WINDOW_FOCUSED } = actionTypes;

// TO DO: make false first, have them click on something (Connect button?)
const initialState: INOBSCAppState = {windowFocused: true};

export const nobscappReducer = (state = initialState, action: NOBSCAppActions): INOBSCAppState => {
  switch (action.type) {
    case NOBSCAPP_WINDOW_FOCUSED: return {...state, ...{windowFocused: action.condition}};
    default:                      return state;
  }
};