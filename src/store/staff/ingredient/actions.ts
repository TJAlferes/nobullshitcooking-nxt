import { actionTypes, ICreatingIngredientInfo, IEditingIngredientInfo } from './types';

const { CREATE_NEW_INGREDIENT, EDIT_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export const createNewIngredient = (ingredientInfo: ICreatingIngredientInfo) => ({type: CREATE_NEW_INGREDIENT, ingredientInfo});
export const editIngredient =      (ingredientInfo: IEditingIngredientInfo) =>  ({type: EDIT_INGREDIENT, ingredientInfo});
export const deleteIngredient =    (id: number) =>                              ({type: DELETE_INGREDIENT, id});