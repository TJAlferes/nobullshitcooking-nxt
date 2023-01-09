import { actionTypes, ICreatingRecipeInfo, IEditingRecipeInfo } from './types';

const {
  CREATE_NEW_PRIVATE_RECIPE, EDIT_PRIVATE_RECIPE, DELETE_PRIVATE_RECIPE,
  CREATE_NEW_PUBLIC_RECIPE, EDIT_PUBLIC_RECIPE, DISOWN_PUBLIC_RECIPE
} = actionTypes;

export const createNewPrivateRecipe = (recipeInfo: ICreatingRecipeInfo) => ({type: CREATE_NEW_PRIVATE_RECIPE, recipeInfo});
export const editPrivateRecipe =      (recipeInfo: IEditingRecipeInfo) =>  ({type: EDIT_PRIVATE_RECIPE, recipeInfo});
export const deletePrivateRecipe =    (id: number) =>                      ({type: DELETE_PRIVATE_RECIPE, id});

export const createNewPublicRecipe = (recipeInfo: ICreatingRecipeInfo) => ({type: CREATE_NEW_PUBLIC_RECIPE, recipeInfo});
export const editPublicRecipe =      (recipeInfo: IEditingRecipeInfo) =>  ({type: EDIT_PUBLIC_RECIPE, recipeInfo});
export const disownPublicRecipe =    (id: number) =>                      ({type: DISOWN_PUBLIC_RECIPE, id});