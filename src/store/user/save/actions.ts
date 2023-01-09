import { actionTypes } from './types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export const saveRecipe =   (recipeId: number) => ({type: SAVE_RECIPE, recipeId});
export const unsaveRecipe = (recipeId: number) => ({type: UNSAVE_RECIPE, recipeId});