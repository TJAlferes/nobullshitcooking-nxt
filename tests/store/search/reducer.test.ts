import { searchReducer } from '../../../src/store/search/reducer';
import { actionTypes, IState } from '../../../src/store/search/types';

const { SET_INDEX } = actionTypes;
const initialState: IState = {index: "recipes"};

describe('search reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = searchReducer(state, {type: SET_INDEX, index: "recipes"});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type SET_INDEX', () => {
    const state =   {...initialState};
    const reducer = searchReducer(state, {type: SET_INDEX, index: "ingredients"});
    expect(reducer.index).toEqual("ingredients");
  });
});