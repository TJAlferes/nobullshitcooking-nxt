export const actionTypes = {
  CREATE_NEW_PRIVATE_INGREDIENT: 'CREATE_NEW_PRIVATE_INGREDIENT',
  EDIT_PRIVATE_INGREDIENT:       'EDIT_PRIVATE_INGREDIENT',
  DELETE_PRIVATE_INGREDIENT:     'DELETE_PRIVATE_INGREDIENT'
} as const;

export interface ICreateNewPrivateIngredient {
  type:           typeof actionTypes.CREATE_NEW_PRIVATE_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IEditPrivateIngredient {
  type:           typeof actionTypes.EDIT_PRIVATE_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IDeletePrivateIngredient {
  type: typeof actionTypes.DELETE_PRIVATE_INGREDIENT;
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
