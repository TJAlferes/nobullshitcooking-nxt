import { actionTypes, ICreatingRecipeInfo, IEditingRecipeInfo } from './types';

const { CREATE_NEW_RECIPE, EDIT_RECIPE, DELETE_RECIPE } = actionTypes;

export const createNewRecipe = (recipeInfo: ICreatingRecipeInfo) => ({type: CREATE_NEW_RECIPE, recipeInfo});
export const editRecipe =      (recipeInfo: IEditingRecipeInfo) =>  ({type: EDIT_RECIPE, recipeInfo});
export const deleteRecipe =    (id: number) =>                      ({type: DELETE_RECIPE, id});