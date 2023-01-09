import { actionTypes, ICreatingIngredientInfo, IEditingIngredientInfo } from './types';

const { CREATE_NEW_PRIVATE_INGREDIENT, EDIT_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = actionTypes;

export const createNewPrivateIngredient = (ingredientInfo: ICreatingIngredientInfo) => ({type: CREATE_NEW_PRIVATE_INGREDIENT, ingredientInfo});
export const editPrivateIngredient =      (ingredientInfo: IEditingIngredientInfo) =>  ({type: EDIT_PRIVATE_INGREDIENT, ingredientInfo});
export const deletePrivateIngredient =    (id: number) =>                              ({type: DELETE_PRIVATE_INGREDIENT, id});