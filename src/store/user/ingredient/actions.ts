import { actionTypes, ICreatingIngredientInfo, IEditingIngredientInfo } from './types';

const { USER_CREATE_NEW_PRIVATE_INGREDIENT, USER_EDIT_PRIVATE_INGREDIENT, USER_DELETE_PRIVATE_INGREDIENT } = actionTypes;

export const userCreateNewPrivateIngredient = (ingredientInfo: ICreatingIngredientInfo) => ({type: USER_CREATE_NEW_PRIVATE_INGREDIENT, ingredientInfo});
export const userEditPrivateIngredient =      (ingredientInfo: IEditingIngredientInfo) =>  ({type: USER_EDIT_PRIVATE_INGREDIENT, ingredientInfo});
export const userDeletePrivateIngredient =    (id: number) =>                              ({type: USER_DELETE_PRIVATE_INGREDIENT, id});