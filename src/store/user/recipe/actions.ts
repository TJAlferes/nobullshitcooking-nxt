import { actionTypes, IRecipeInfo, IRecipeUpdateInfo } from './types';

const {
  CREATE_PRIVATE_RECIPE,
  UPDATE_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE,

  CREATE_PUBLIC_RECIPE,
  UPDATE_PUBLIC_RECIPE,
  DISOWN_PUBLIC_RECIPE
} = actionTypes;

export const createPrivateRecipe = (recipeInfo: IRecipeInfo) =>       ({type: CREATE_PRIVATE_RECIPE, recipeInfo});
export const updatePrivateRecipe = (recipeInfo: IRecipeUpdateInfo) => ({type: UPDATE_PRIVATE_RECIPE, recipeInfo});
export const deletePrivateRecipe = (id: number) =>                    ({type: DELETE_PRIVATE_RECIPE, id});

export const createPublicRecipe = (recipeInfo: IRecipeInfo) =>       ({type: CREATE_PUBLIC_RECIPE, recipeInfo});
export const updatePublicRecipe = (recipeInfo: IRecipeUpdateInfo) => ({type: UPDATE_PUBLIC_RECIPE, recipeInfo});
export const disownPublicRecipe = (id: number) =>                    ({type: DISOWN_PUBLIC_RECIPE, id});