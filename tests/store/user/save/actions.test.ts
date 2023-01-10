import { saveRecipe, unsaveRecipe } from '../../../../src/store/user/save/actions';
import { actionTypes } from '../../../../src/store/user/save/types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

describe('saveRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(saveRecipe(4).type).toEqual(SAVE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(saveRecipe(4).recipeId).toEqual(4);
  });
});

describe('unsaveRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(unsaveRecipe(4).type).toEqual(UNSAVE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(unsaveRecipe(4).recipeId).toEqual(4);
  });
});