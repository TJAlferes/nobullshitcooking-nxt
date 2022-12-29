import { ICreatingIngredientInfo, IEditingIngredientInfo } from '../../staff/ingredient/types';

export type { ICreatingIngredientInfo, IEditingIngredientInfo } from '../../staff/ingredient/types';

export const actionTypes = {
  USER_CREATE_NEW_PRIVATE_INGREDIENT: 'USER_CREATE_NEW_PRIVATE_INGREDIENT',
  USER_EDIT_PRIVATE_INGREDIENT: 'USER_EDIT_PRIVATE_INGREDIENT',
  USER_DELETE_PRIVATE_INGREDIENT: 'USER_DELETE_PRIVATE_INGREDIENT'
} as const;

export interface IUserCreateNewPrivateIngredient {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IUserEditPrivateIngredient {
  type: typeof actionTypes.USER_EDIT_PRIVATE_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IUserDeletePrivateIngredient {
  type: typeof actionTypes.USER_DELETE_PRIVATE_INGREDIENT;
  id: number;
}