export const actionTypes = {
  STAFF_CREATE_NEW_INGREDIENT: 'STAFF_CREATE_NEW_INGREDIENT',
  STAFF_EDIT_INGREDIENT: 'STAFF_EDIT_INGREDIENT',
  STAFF_DELETE_INGREDIENT: 'STAFF_DELETE_INGREDIENT'
} as const;

export interface IStaffCreateNewIngredient {
  type: typeof actionTypes.STAFF_CREATE_NEW_INGREDIENT;
  ingredientInfo: ICreatingIngredientInfo;
}

export interface IStaffEditIngredient {
  type: typeof actionTypes.STAFF_EDIT_INGREDIENT;
  ingredientInfo: IEditingIngredientInfo;
}

export interface IStaffDeleteIngredient {
  type: typeof actionTypes.STAFF_DELETE_INGREDIENT;
  id: number;
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