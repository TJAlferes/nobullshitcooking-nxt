export const actionTypes = {
  STAFF_CREATE_NEW_INGREDIENT: 'STAFF_CREATE_NEW_INGREDIENT',
  STAFF_CREATE_NEW_INGREDIENT_SUCCEEDED: 'STAFF_CREATE_NEW_INGREDIENT_SUCCEEDED',
  STAFF_CREATE_NEW_INGREDIENT_FAILED: 'STAFF_CREATE_NEW_INGREDIENT_FAILED',
  STAFF_EDIT_INGREDIENT: 'STAFF_EDIT_INGREDIENT',
  STAFF_EDIT_INGREDIENT_SUCCEEDED: 'STAFF_EDIT_INGREDIENT_SUCCEEDED',
  STAFF_EDIT_INGREDIENT_FAILED: 'STAFF_EDIT_INGREDIENT_FAILED',
  STAFF_DELETE_INGREDIENT: 'STAFF_DELETE_INGREDIENT',
  STAFF_DELETE_INGREDIENT_SUCCEEDED: 'STAFF_DELETE_INGREDIENT_SUCCEEDED',
  STAFF_DELETE_INGREDIENT_FAILED: 'STAFF_DELETE_INGREDIENT_FAILED'
} as const;

export interface IStaffCreateNewIngredient {
  type: typeof actionTypes.STAFF_CREATE_NEW_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IStaffCreateNewIngredientSucceeded {
  type: typeof actionTypes.STAFF_CREATE_NEW_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IStaffCreateNewIngredientFailed {
  type: typeof actionTypes.STAFF_CREATE_NEW_INGREDIENT_FAILED;
  message: string;
}

export interface IStaffEditIngredient {
  type: typeof actionTypes.STAFF_EDIT_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IStaffEditIngredientSucceeded {
  type: typeof actionTypes.STAFF_EDIT_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IStaffEditIngredientFailed {
  type: typeof actionTypes.STAFF_EDIT_INGREDIENT_FAILED;
  message: string;
}

export interface IStaffDeleteIngredient {
  type: typeof actionTypes.STAFF_DELETE_INGREDIENT;
  id: number;
}

export interface IStaffDeleteIngredientSucceeded {
  type: typeof actionTypes.STAFF_DELETE_INGREDIENT_SUCCEEDED;
  message: string;
}

export interface IStaffDeleteIngredientFailed {
  type: typeof actionTypes.STAFF_DELETE_INGREDIENT_FAILED;
  message: string;
}

export interface ICreatingIngredientInfo {
  ingredientTypeId: number;
  name: string;
  description: string;
  image: string | ArrayBuffer | null;
  fullImage: File | null;
  tinyImage: File | null;
}

export interface IEditingIngredientInfo extends ICreatingIngredientInfo {
  id: number;
  prevImage: string;
}