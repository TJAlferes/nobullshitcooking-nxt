export const actionTypes = {
  CREATE_INGREDIENT: 'CREATE_INGREDIENT',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
} as const;

export type CreateIngredient = {
  type:            typeof actionTypes.CREATE_INGREDIENT;
  ingredient_info: IngredientInfo;
};

export type UpdateIngredient = {
  type:            typeof actionTypes.UPDATE_INGREDIENT;
  ingredient_info: IngredientUpdateInfo;
};

export type DeleteIngredient = {
  type:          typeof actionTypes.DELETE_INGREDIENT;
  ingredient_id: string;
};

// TO DO: move shared types to one location

export type IngredientInfo = {
  ingredient_type_id: number;
  ingredient_name:    string;
  description:        string;
  //image:            string | ArrayBuffer | null;
  //fullImage:        File | null;
  //tinyImage:        File | null;
};

export type IngredientUpdateInfo = IngredientInfo & {
  ingredient_id: string;
  prevImage: string;
};
