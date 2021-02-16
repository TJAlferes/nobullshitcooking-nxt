import { actionTypes } from './types';

const { USER_FAVORITE_RECIPE, USER_UNFAVORITE_RECIPE } = actionTypes;

export const userFavoriteRecipe = (recipeId: number) => ({
  type: USER_FAVORITE_RECIPE,
  recipeId
});

export const userUnfavoriteRecipe = (recipeId: number) => ({
  type: USER_UNFAVORITE_RECIPE,
  recipeId
});