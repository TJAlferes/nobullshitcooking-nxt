import { actionTypes, ICreatingRecipeInfo, IEditingRecipeInfo } from './types';

const {
  STAFF_CREATE_NEW_RECIPE,
  STAFF_EDIT_RECIPE,
  STAFF_DELETE_RECIPE
} = actionTypes;

export const staffCreateNewRecipe = (recipeInfo: ICreatingRecipeInfo) => ({
  type: STAFF_CREATE_NEW_RECIPE,
  recipeInfo
});

export const staffEditRecipe = (recipeInfo: IEditingRecipeInfo) => ({
  type: STAFF_EDIT_RECIPE,
  recipeInfo
});

export const staffDeleteRecipe = (id: number) => ({
  type: STAFF_DELETE_RECIPE,
  id
});