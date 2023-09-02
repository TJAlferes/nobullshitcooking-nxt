import type { Ownership } from "../shared/types";

export const createRecipe = (ownership: Ownership, recipe_upload: RecipeUpload) =>
  ({type: CREATE_RECIPE, ownership, recipe_upload});

export const updateRecipe = (ownership: Ownership, recipe_update_upload: RecipeUpdateUpload) =>
  ({type: UPDATE_RECIPE, ownership, recipe_update_upload});

export const deleteRecipe = (ownership: Ownership, recipe_id: string) =>
  ({type: DELETE_RECIPE, ownership, recipe_id});

export const actionTypes = {
  CREATE_RECIPE: 'CREATE_RECIPE',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE'
} as const;

const {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE
} = actionTypes;

export type CreateRecipe = {
  type:          typeof actionTypes.CREATE_RECIPE;
  ownership:     Ownership
  recipe_upload: RecipeUpload;
};

export type UpdateRecipe = {
  type:                 typeof actionTypes.UPDATE_RECIPE;
  ownership:            Ownership
  recipe_update_upload: RecipeUpdateUpload;
};

export type DeleteRecipe = {
  type:      typeof actionTypes.DELETE_RECIPE;
  ownership: Ownership
  recipe_id: string;
};

type RecipeUpload = {

};

type RecipeUpdateUpload = RecipeUpload & {

};
