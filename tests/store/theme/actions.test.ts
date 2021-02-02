import {
  themeDarkTrigger,
  themeLightTrigger
} from '../../../src/store/theme/actions';
import { actionTypes } from '../../../src/store/theme/types';

const { THEME_DARK_TRIGGER, THEME_LIGHT_TRIGGER } = actionTypes;

describe('themeDarkTrigger action creator', () => {
  it('returns the correct action type', () => {
    expect(themeDarkTrigger().type).toEqual(THEME_DARK_TRIGGER);
  });
});

describe('themeLightTrigger action creator', () => {
  it('returns the correct action type', () => {
    expect(themeLightTrigger().type).toEqual(THEME_LIGHT_TRIGGER);
  });
});