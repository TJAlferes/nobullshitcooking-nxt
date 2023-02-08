export const actionTypes = {
  CREATE_INGREDIENT: 'CREATE_INGREDIENT',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
} as const;

export interface ICreateIngredient {
  type:           typeof actionTypes.CREATE_INGREDIENT;
  ingredientInfo: IIngredientInfo;
}

export interface IUpdateIngredient {
  type:           typeof actionTypes.UPDATE_INGREDIENT;
  ingredientInfo: IIngredientUpdateInfo;
}

export interface IDeleteIngredient {
  type: typeof actionTypes.DELETE_INGREDIENT;
  id:   number;
}

export interface IIngredientInfo {
  ingredientTypeId: number;
  name:             string;
  description:      string;
  image:            string | ArrayBuffer | null;
  fullImage:        File | null;
  tinyImage:        File | null;
}

export interface IIngredientUpdateInfo extends IIngredientInfo {
  id:        number;
  prevImage: string;
}
