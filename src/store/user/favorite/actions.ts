import { actionTypes } from './types';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export const favoriteRecipe =   (recipeId: number) => ({type: FAVORITE_RECIPE, recipeId});
export const unfavoriteRecipe = (recipeId: number) => ({type: UNFAVORITE_RECIPE, recipeId});