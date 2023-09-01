import { RecipeUpload, RecipeUpdateUpload } from "../../../shared/types";



export const createPrivateRecipe = (recipe_upload: RecipeUpload) =>
  ({type: CREATE_PRIVATE_RECIPE, recipe_upload});

export const updatePrivateRecipe = (recipe_update_upload: RecipeUpdateUpload) =>
  ({type: UPDATE_PRIVATE_RECIPE, recipe_update_upload});

export const deletePrivateRecipe = (recipe_id: string) =>
  ({type: DELETE_PRIVATE_RECIPE, recipe_id});



export const actionTypes = {
  CREATE_PRIVATE_RECIPE: 'CREATE_PRIVATE_RECIPE',
  UPDATE_PRIVATE_RECIPE: 'UPDATE_PRIVATE_RECIPE',
  DELETE_PRIVATE_RECIPE: 'DELETE_PRIVATE_RECIPE'
} as const;

const {
  CREATE_PRIVATE_RECIPE,
  UPDATE_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE
} = actionTypes;

export type CreatePrivateRecipe = {
  type:        typeof actionTypes.CREATE_PRIVATE_RECIPE;
  recipe_upload: RecipeUpload;
};

export type UpdatePrivateRecipe = {
  type:        typeof actionTypes.UPDATE_PRIVATE_RECIPE;
  recipe_update_upload: RecipeUpdateUpload;
};

export type DeletePrivateRecipe = {
  type:      typeof actionTypes.DELETE_PRIVATE_RECIPE;
  recipe_id: string;
};
