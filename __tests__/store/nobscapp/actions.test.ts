import { windowFocused } from '../../../src/store/nobscapp/actions';
import { actionTypes } from '../../../src/store/nobscapp/types';

const { WINDOW_FOCUSED } = actionTypes;

describe('windowFocused action creator', () => {
  it('returns the correct action type', () => {
    expect(windowFocused(false).type).toEqual(WINDOW_FOCUSED);
  });

  it('returns the correct condition', () => {
    expect(windowFocused(false).condition).toEqual(false);
  });
});