import { actionTypes, ISearchState, ISearchActions } from './types';

const { SEARCH_SET_INDEX } = actionTypes;

const initialState: ISearchState = {currentIndex: "recipes"};

export const searchReducer = (
  state = initialState,
  action: ISearchActions
): ISearchState => {
  switch (action.type) {
    case SEARCH_SET_INDEX: return {...state, ...{currentIndex: action.index}};
    default: return state;
  }
};