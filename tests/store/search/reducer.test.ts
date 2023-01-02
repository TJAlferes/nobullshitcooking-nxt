import { searchReducer } from '../../../src/store/search/reducer';
import { actionTypes, ISearchState } from '../../../src/store/search/types';

const { SEARCH_SET_INDEX } = actionTypes;
const initialState: ISearchState = {currentIndex: "recipes"};

describe('search reducer', () => {
  it('returns initial state', () => {
    const state = undefined;
    const reducer = searchReducer(state, {type: SEARCH_SET_INDEX, index: "recipes"});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type SEARCH_SET_INDEX', () => {
    const state = {...initialState};
    const reducer = searchReducer(state, {type: SEARCH_SET_INDEX, index: "ingredients"});
    expect(reducer.currentIndex).toEqual("ingredients");
  });
});