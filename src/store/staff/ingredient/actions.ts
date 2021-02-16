import {
  actionTypes,
  ICreatingIngredientInfo,
  IEditingIngredientInfo
} from './types';

const {
  STAFF_CREATE_NEW_INGREDIENT,
  STAFF_EDIT_INGREDIENT,
  STAFF_DELETE_INGREDIENT
} = actionTypes;

export const staffCreateNewIngredient = (
  ingredientInfo: ICreatingIngredientInfo
) => ({
  type: STAFF_CREATE_NEW_INGREDIENT,
  ingredientInfo
});

export const staffEditIngredient = (
  ingredientInfo: IEditingIngredientInfo
) => ({
  type: STAFF_EDIT_INGREDIENT,
  ingredientInfo
});

export const staffDeleteIngredient = (id: number) => ({
  type: STAFF_DELETE_INGREDIENT,
  id
});