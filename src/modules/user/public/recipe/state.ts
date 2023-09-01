import { RecipeUpload, RecipeUpdateUpload } from "../../../shared/types";



export const createPublicRecipe = (recipe_upload: RecipeUpload) =>
  ({type: CREATE_PUBLIC_RECIPE, recipe_upload});

export const updatePublicRecipe = (recipe_update_upload: RecipeUpdateUpload) =>
  ({type: UPDATE_PUBLIC_RECIPE, recipe_update_upload});

export const disownPublicRecipe = (recipe_id: string) =>
  ({type: DISOWN_PUBLIC_RECIPE, recipe_id});



export const actionTypes = {
  CREATE_PUBLIC_RECIPE: 'CREATE_PUBLIC_RECIPE',
  UPDATE_PUBLIC_RECIPE: 'UPDATE_PUBLIC_RECIPE',
  DISOWN_PUBLIC_RECIPE: 'DISOWN_PUBLIC_RECIPE'
} as const;

const {
  CREATE_PUBLIC_RECIPE,
  UPDATE_PUBLIC_RECIPE,
  DISOWN_PUBLIC_RECIPE
} = actionTypes;

export type CreatePublicRecipe = {
  type:          typeof actionTypes.CREATE_PUBLIC_RECIPE;
  recipe_upload: RecipeUpload;
};

export type UpdatePublicRecipe = {
  type:                 typeof actionTypes.UPDATE_PUBLIC_RECIPE;
  recipe_update_upload: RecipeUpdateUpload;
};

export type DisownPublicRecipe = {
  type:      typeof actionTypes.DISOWN_PUBLIC_RECIPE;
  recipe_id: string;
};
