import { actionTypes } from './types';

const { USER_SAVE_RECIPE, USER_UNSAVE_RECIPE } = actionTypes;

export const userSaveRecipe =   (recipeId: number) => ({type: USER_SAVE_RECIPE, recipeId});
export const userUnsaveRecipe = (recipeId: number) => ({type: USER_UNSAVE_RECIPE, recipeId});