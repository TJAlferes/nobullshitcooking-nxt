import {
  userFavoriteRecipe,
  userUnfavoriteRecipe
} from '../../../../src/store/user/favorite/actions';
import { actionTypes } from '../../../../src/store/user/favorite/types';

const { USER_FAVORITE_RECIPE, USER_UNFAVORITE_RECIPE } = actionTypes;

describe('userFavoriteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userFavoriteRecipe(4).type).toEqual(USER_FAVORITE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(userFavoriteRecipe(4).recipeId).toEqual(4);
  });
});

describe('userUnfavoriteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userUnfavoriteRecipe(4).type).toEqual(USER_UNFAVORITE_RECIPE);
  });

  it('returns the correct recipeId', () => {
    expect(userUnfavoriteRecipe(4).recipeId).toEqual(4);
  });
});