import { nobscappWindowFocused } from '../../../src/store/nobscapp/actions';
import { actionTypes } from '../../../src/store/nobscapp/types';

const { NOBSCAPP_WINDOW_FOCUSED } = actionTypes;

describe('nobscappWindowFocused action creator', () => {
  it('returns the correct action type', () => {
    expect(nobscappWindowFocused(false).type).toEqual(NOBSCAPP_WINDOW_FOCUSED);
  });

  it('returns the correct condition', () => {
    expect(nobscappWindowFocused(false).condition).toEqual(false);
  });
});