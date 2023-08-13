import { actionTypes } from './types';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export const favoriteRecipe   = (recipe_id: string) => ({type: FAVORITE_RECIPE, recipe_id});
export const unfavoriteRecipe = (recipe_id: string) => ({type: UNFAVORITE_RECIPE, recipe_id});
