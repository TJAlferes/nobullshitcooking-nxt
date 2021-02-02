import { nobscappReducer } from '../../../src/store/nobscapp/reducer';
import { actionTypes } from '../../../src/store/nobscapp/types';

const { NOBSCAPP_WINDOW_FOCUSED } = actionTypes;

describe('nobscapp reducer', () => {
  it('returns initial state', () => {
    expect(nobscappReducer(undefined, {
      type: NOBSCAPP_WINDOW_FOCUSED,
      condition: false
    })).toEqual({windowFocused: false});
  });

  it('handles actions of type NOBSCAPP_WINDOW_FOCUSED', () => {
    const initialState = {windowFocused: true};
    
    expect(nobscappReducer(initialState, {
      type: NOBSCAPP_WINDOW_FOCUSED,
      condition: false
    })).toEqual({windowFocused: false});
  });
});