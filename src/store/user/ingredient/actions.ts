import { actionTypes, IIngredientInfo, IIngredientUpdateInfo } from './types';

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export const createIngredient = (ingredientInfo: IIngredientInfo) =>       ({type: CREATE_INGREDIENT, ingredientInfo});
export const updateIngredient = (ingredientInfo: IIngredientUpdateInfo) => ({type: UPDATE_INGREDIENT, ingredientInfo});
export const deleteIngredient = (id: number) =>                            ({type: DELETE_INGREDIENT, id});