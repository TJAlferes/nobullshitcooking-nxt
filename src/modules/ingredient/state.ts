import type { Ownership }                              from "../shared/types";


export const createIngredient = (ownership: Ownership, ingredient_upload: IngredientUpload) =>
  ({type: CREATE_INGREDIENT, ownership, ingredient_upload});

export const updateIngredient = (ownership: Ownership, ingredient_update_upload: IngredientUpdateUpload) =>
  ({type: UPDATE_INGREDIENT, ownership, ingredient_update_upload});

export const deleteIngredient = (ownership: Ownership, ingredient_id: string) =>
  ({type: DELETE_INGREDIENT, ownership, ingredient_id});

export const actionTypes = {
  CREATE_INGREDIENT: 'CREATE_INGREDIENT',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
} as const;

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export type CreateIngredient = {
  type:              typeof actionTypes.CREATE_INGREDIENT;
  ownership:         Ownership;
  ingredient_upload: IngredientUpload;
};

export type UpdateIngredient = {
  type:                     typeof actionTypes.UPDATE_INGREDIENT;
  ownership:                Ownership;
  ingredient_update_upload: IngredientUpdateUpload;
};

export type DeleteIngredient = {
  type:          typeof actionTypes.DELETE_INGREDIENT;
  ownership:     Ownership;
  ingredient_id: string;
};
