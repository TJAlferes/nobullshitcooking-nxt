export const actionTypes = {
  CREATE_NEW_INGREDIENT: 'CREATE_NEW_INGREDIENT',
  EDIT_INGREDIENT:       'EDIT_INGREDIENT',
  DELETE_INGREDIENT:     'DELETE_INGREDIENT'
} as const;

export interface ICreateNewIngredient {
  type:           typeof actionTypes.CREATE_NEW_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IEditIngredient {
  type:           typeof actionTypes.EDIT_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IDeleteIngredient {
  type: typeof actionTypes.DELETE_INGREDIENT;
  id:   number;
}

export interface ICreatingIngredientInfo {
  ingredientTypeId: number;
  name:             string;
  description:      string;
  image:            string | ArrayBuffer | null;
  fullImage:        File | null;
  tinyImage:        File | null;
}

export interface IEditingIngredientInfo extends ICreatingIngredientInfo {
  id:        number;
  prevImage: string;
}