import { themeReducer } from '../../../src/store/theme/reducer';
import { actionTypes } from '../../../src/store/theme/types';

const { DARK, LIGHT } = actionTypes;

const initialState = {theme: "light"};

describe('theme reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = themeReducer(state, {type: LIGHT});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type DARK', () => {
    const state =   {...initialState};
    const reducer = themeReducer(state, {type: DARK});
    expect(reducer.theme).toEqual("dark");
  });

  it('handles actions of type LIGHT', () => {
    const state =   {theme: "dark"};
    const reducer = themeReducer(state, {type: LIGHT});
    expect(reducer.theme).toEqual("light");
  });
});