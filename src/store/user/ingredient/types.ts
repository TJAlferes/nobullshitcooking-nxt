import type { ICreatingIngredientInfo, IEditingIngredientInfo } from '../../staff/ingredient/types';

export type { ICreatingIngredientInfo, IEditingIngredientInfo } from '../../staff/ingredient/types';

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