import { favoriteRecipe, unfavoriteRecipe } from '../../../../src/store/user/favorite/actions';
import { actionTypes } from '../../../../src/store/user/favorite/types';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

describe('favoriteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(favoriteRecipe(4).type).toEqual(FAVORITE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(favoriteRecipe(4).recipeId).toEqual(4);
  });
});

describe('unfavoriteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(unfavoriteRecipe(4).type).toEqual(UNFAVORITE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(unfavoriteRecipe(4).recipeId).toEqual(4);
  });
});