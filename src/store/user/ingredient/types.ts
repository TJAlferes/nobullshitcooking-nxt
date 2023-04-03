export const actionTypes = {
  CREATE_INGREDIENT: 'CREATE_INGREDIENT',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
} as const;

export type CreateIngredient = {
  type:           typeof actionTypes.CREATE_INGREDIENT;
  ingredientInfo: IngredientInfo;
};

export type UpdateIngredient = {
  type:           typeof actionTypes.UPDATE_INGREDIENT;
  ingredientInfo: IngredientUpdateInfo;
};

export type DeleteIngredient = {
  type: typeof actionTypes.DELETE_INGREDIENT;
  id:   number;
};

export type IngredientInfo = {
  ingredientTypeId: number;
  name:             string;
  description:      string;
  image:            string | ArrayBuffer | null;
  fullImage:        File | null;
  tinyImage:        File | null;
};

export type IngredientUpdateInfo = IngredientInfo & {
  id:        number;
  prevImage: string;
};
