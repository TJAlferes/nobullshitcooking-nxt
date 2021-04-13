import {
  userSaveRecipe,
  userUnsaveRecipe
} from '../../../../src/store/user/save/actions';
import { actionTypes } from '../../../../src/store/user/save/types';

const { USER_SAVE_RECIPE, USER_UNSAVE_RECIPE } = actionTypes;

describe('userSaveRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userSaveRecipe(4).type).toEqual(USER_SAVE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(userSaveRecipe(4).recipeId).toEqual(4);
  });
});

describe('userUnsaveRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userUnsaveRecipe(4).type).toEqual(USER_UNSAVE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(userUnsaveRecipe(4).recipeId).toEqual(4);
  });
});