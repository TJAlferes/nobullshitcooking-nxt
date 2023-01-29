import { menuReducer } from '../../../src/store/menu/reducer';
import { actionTypes } from '../../../src/store/menu/types';

const { OPEN_LEFT_NAV, CLOSE_LEFT_NAV } = actionTypes;

const initialState = {leftNav: false};

describe('menu reducer', () => {
  it('returns initial state', () => {
    const reducer = menuReducer(undefined, {type: CLOSE_LEFT_NAV});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type OPEN_LEFT_NAV', () => {
    const reducer = menuReducer({leftNav: false}, {type: OPEN_LEFT_NAV});
    expect(reducer.leftNav).toEqual(true);
  });

  it('handles actions of type CLOSE_LEFT_NAV', () => {
    const reducer = menuReducer({leftNav: true}, {type: CLOSE_LEFT_NAV});
    expect(reducer.leftNav).toEqual(false);
  });
});