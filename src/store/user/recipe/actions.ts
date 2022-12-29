import { actionTypes, ICreatingRecipeInfo, IEditingRecipeInfo } from './types';

const {
  USER_CREATE_NEW_PRIVATE_RECIPE, USER_EDIT_PRIVATE_RECIPE, USER_DELETE_PRIVATE_RECIPE,
  USER_CREATE_NEW_PUBLIC_RECIPE, USER_EDIT_PUBLIC_RECIPE, USER_DISOWN_PUBLIC_RECIPE
} = actionTypes;

export const userCreateNewPrivateRecipe = (recipeInfo: ICreatingRecipeInfo) => ({type: USER_CREATE_NEW_PRIVATE_RECIPE, recipeInfo});
export const userEditPrivateRecipe =      (recipeInfo: IEditingRecipeInfo) =>  ({type: USER_EDIT_PRIVATE_RECIPE, recipeInfo});
export const userDeletePrivateRecipe =    (id: number) =>                      ({type: USER_DELETE_PRIVATE_RECIPE, id});

export const userCreateNewPublicRecipe = (recipeInfo: ICreatingRecipeInfo) => ({type: USER_CREATE_NEW_PUBLIC_RECIPE, recipeInfo});
export const userEditPublicRecipe =      (recipeInfo: IEditingRecipeInfo) =>  ({type: USER_EDIT_PUBLIC_RECIPE, recipeInfo});
export const userDisownPublicRecipe =    (id: number) =>                      ({type: USER_DISOWN_PUBLIC_RECIPE, id});