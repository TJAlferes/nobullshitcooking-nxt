import { actionTypes, IngredientInfo, IngredientUpdateInfo } from './types';

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export const createIngredient = (ingredientInfo: IngredientInfo) =>       ({type: CREATE_INGREDIENT, ingredientInfo});
export const updateIngredient = (ingredientInfo: IngredientUpdateInfo) => ({type: UPDATE_INGREDIENT, ingredientInfo});
export const deleteIngredient = (ingredient_id: string) =>                ({type: DELETE_INGREDIENT, ingredient_id});
