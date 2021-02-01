import {
  ICreatingIngredientInfo,
  IEditingIngredientInfo
} from '../../staff/ingredient/types';

export type {
  ICreatingIngredientInfo,
  IEditingIngredientInfo
} from '../../staff/ingredient/types';

export const actionTypes = {
  USER_CREATE_NEW_PRIVATE_INGREDIENT: 'USER_CREATE_NEW_PRIVATE_INGREDIENT',
  USER_CREATE_NEW_PRIVATE_INGREDIENT_SUCCEEDED: 'USER_CREATE_NEW_PRIVATE_INGREDIENT_SUCCEEDED',
  USER_CREATE_NEW_PRIVATE_INGREDIENT_FAILED: 'USER_CREATE_NEW_PRIVATE_INGREDIENT_FAILED',
  USER_EDIT_PRIVATE_INGREDIENT: 'USER_EDIT_PRIVATE_INGREDIENT',
  USER_EDIT_PRIVATE_INGREDIENT_SUCCEEDED: 'USER_EDIT_PRIVATE_INGREDIENT_SUCCEEDED',
  USER_EDIT_PRIVATE_INGREDIENT_FAILED: 'USER_EDIT_PRIVATE_INGREDIENT_FAILED',
  USER_DELETE_PRIVATE_INGREDIENT: 'USER_DELETE_PRIVATE_INGREDIENT',
  USER_DELETE_PRIVATE_INGREDIENT_SUCCEEDED: 'USER_DELETE_PRIVATE_INGREDIENT_SUCCEEDED',
  USER_DELETE_PRIVATE_INGREDIENT_FAILED: 'USER_DELETE_PRIVATE_INGREDIENT_FAILED'
} as const;

export interface IUserCreateNewPrivateIngredient {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IUserCreateNewPrivateIngredientSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IUserCreateNewPrivateIngredientFailed {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_INGREDIENT_FAILED;
  message: string;
}

export interface IUserEditPrivateIngredient {
  type: typeof actionTypes.USER_EDIT_PRIVATE_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IUserEditPrivateIngredientSucceeded {
  type: typeof actionTypes.USER_EDIT_PRIVATE_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IUserEditPrivateIngredientFailed {
  type: typeof actionTypes.USER_EDIT_PRIVATE_INGREDIENT_FAILED;
  message: string;
}

export interface IUserDeletePrivateIngredient {
  type: typeof actionTypes.USER_DELETE_PRIVATE_INGREDIENT;
  id: number;
}

export interface IUserDeletePrivateIngredientSucceeded {
  type: typeof actionTypes.USER_DELETE_PRIVATE_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IUserDeletePrivateIngredientFailed {
  type: typeof actionTypes.USER_DELETE_PRIVATE_INGREDIENT_FAILED;
  message: string;
}