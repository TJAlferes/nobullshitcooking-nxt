import { closeLeftNav, openLeftNav } from '../../../src/store/menu/actions';
import { actionTypes } from '../../../src/store/menu/types';

const { CLOSE_LEFT_NAV, OPEN_LEFT_NAV } = actionTypes;

describe('openLeftNav action creator', () => {
  it('returns the correct action type', () => {
    expect(openLeftNav().type).toEqual(OPEN_LEFT_NAV);
  });
});

describe('closeLeftNav action creator', () => {
  it('returns the correct action type', () => {
    expect(closeLeftNav().type).toEqual(CLOSE_LEFT_NAV);
  });
});