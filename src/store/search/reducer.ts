import { actionTypes, IState, IActions } from './types';

const { SET_INDEX } = actionTypes;

const initialState: IState = {index: "recipes"};

export const searchReducer = (state = initialState, action: IActions): IState => {
  switch (action.type) {
    case SET_INDEX: return {...state, ...{index: action.index}};
    default:        return state;
  }
};