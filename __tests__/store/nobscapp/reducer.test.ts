import { nobscappReducer } from '../../../src/store/nobscapp/reducer';
import { actionTypes } from '../../../src/store/nobscapp/types';

const { WINDOW_FOCUSED } = actionTypes;

describe('nobscapp reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = nobscappReducer(state, {type: WINDOW_FOCUSED, condition: false});
    expect(reducer.windowFocused).toEqual(false);
  });

  it('handles actions of type WINDOW_FOCUSED', () => {
    const state =   {windowFocused: true};
    const reducer = nobscappReducer(state, {type: WINDOW_FOCUSED, condition: false});
    expect(reducer.windowFocused).toEqual(false);
  });
});