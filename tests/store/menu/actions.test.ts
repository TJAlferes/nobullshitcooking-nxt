import {
  menuShadowShow,
  menuShadowHide
} from '../../../src/store/menu/actions';
import { actionTypes } from '../../../src/store/menu/types';

const { MENU_SHADOW_SHOW, MENU_SHADOW_HIDE } = actionTypes;

describe('menuShadowShow action creator', () => {
  it('returns the correct action type', () => {
    expect(menuShadowShow().type).toEqual(MENU_SHADOW_SHOW);
  });
});

describe('menuShadowHide action creator', () => {
  it('returns the correct action type', () => {
    expect(menuShadowHide().type).toEqual(MENU_SHADOW_HIDE);
  });
});