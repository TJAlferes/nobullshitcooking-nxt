

export const createIngredient = (ingredientInfo: IngredientInfo) =>
  ({type: CREATE_INGREDIENT, ingredientInfo});

export const updateIngredient = (ingredientInfo: IngredientUpdateInfo) =>
  ({type: UPDATE_INGREDIENT, ingredientInfo});

export const deleteIngredient = (ingredient_id: string) =>
  ({type: DELETE_INGREDIENT, ingredient_id});



export const actionTypes = {
  CREATE_INGREDIENT: 'CREATE_INGREDIENT',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
} as const;

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

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
  notes:              string;
  //image:            string | ArrayBuffer | null;
  //fullImage:        File | null;
  //tinyImage:        File | null;
};

export type IngredientUpdateInfo = IngredientInfo & {
  ingredient_id: string;
  prevImage: string;
};
