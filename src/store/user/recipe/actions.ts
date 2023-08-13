import { actionTypes, RecipeInfo, RecipeUpdateInfo } from './types';

const {
  CREATE_PRIVATE_RECIPE,
  UPDATE_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE,

  CREATE_PUBLIC_RECIPE,
  UPDATE_PUBLIC_RECIPE,
  DISOWN_PUBLIC_RECIPE
} = actionTypes;

export const createPrivateRecipe = (recipeInfo: RecipeInfo) =>       ({type: CREATE_PRIVATE_RECIPE, recipeInfo});
export const updatePrivateRecipe = (recipeInfo: RecipeUpdateInfo) => ({type: UPDATE_PRIVATE_RECIPE, recipeInfo});
export const deletePrivateRecipe = (recipe_id: string) =>            ({type: DELETE_PRIVATE_RECIPE, recipe_id});

export const createPublicRecipe = (recipeInfo: RecipeInfo) =>       ({type: CREATE_PUBLIC_RECIPE, recipeInfo});
export const updatePublicRecipe = (recipeInfo: RecipeUpdateInfo) => ({type: UPDATE_PUBLIC_RECIPE, recipeInfo});
export const disownPublicRecipe = (recipe_id: string) =>            ({type: DISOWN_PUBLIC_RECIPE, recipe_id});
