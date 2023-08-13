import { actionTypes } from './types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export const saveRecipe   = (recipe_id: string) => ({type: SAVE_RECIPE, recipe_id});
export const unsaveRecipe = (recipe_id: string) => ({type: UNSAVE_RECIPE, recipe_id});
