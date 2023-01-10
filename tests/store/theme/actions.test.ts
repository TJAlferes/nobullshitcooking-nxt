import { dark, light } from '../../../src/store/theme/actions';
import { actionTypes } from '../../../src/store/theme/types';

const { DARK, LIGHT } = actionTypes;

describe('dark action creator', () => {
  it('returns the correct action type', () => {
    expect(dark().type).toEqual(DARK);
  });
});

describe('light action creator', () => {
  it('returns the correct action type', () => {
    expect(light().type).toEqual(LIGHT);
  });
});