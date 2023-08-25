

export const createPrivateIngredient = (ingredientInfo: IngredientInfo) =>
  ({type: CREATE_PRIVATE_INGREDIENT, ingredientInfo});

export const updatePrivateIngredient = (ingredientInfo: IngredientUpdateInfo) =>
  ({type: UPDATE_PRIVATE_INGREDIENT, ingredientInfo});

export const deletePrivateIngredient = (ingredient_id: string) =>
  ({type: DELETE_PRIVATE_INGREDIENT, ingredient_id});



export const actionTypes = {
  CREATE_PRIVATE_INGREDIENT: 'CREATE_PRIVATE_INGREDIENT',
  UPDATE_PRIVATE_INGREDIENT: 'UPDATE_PRIVATE_INGREDIENT',
  DELETE_PRIVATE_INGREDIENT: 'DELETE_PRIVATE_INGREDIENT'
} as const;

const { CREATE_PRIVATE_INGREDIENT, UPDATE_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = actionTypes;

export type CreatePrivateIngredient = {
  type:            typeof actionTypes.CREATE_PRIVATE_INGREDIENT;
  ingredient_info: IngredientInfo;
};

export type UpdatePrivateIngredient = {
  type:            typeof actionTypes.UPDATE_PRIVATE_INGREDIENT;
  ingredient_info: IngredientUpdateInfo;
};

export type DeletePrivateIngredient = {
  type:          typeof actionTypes.DELETE_PRIVATE_INGREDIENT;
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
  prevImage:     string;
};
