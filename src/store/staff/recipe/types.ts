export const actionTypes = {
  STAFF_CREATE_NEW_RECIPE: 'STAFF_CREATE_NEW_RECIPE',
  STAFF_CREATE_NEW_RECIPE_SUCCEEDED: 'STAFF_CREATE_NEW_RECIPE_SUCCEEDED',
  STAFF_CREATE_NEW_RECIPE_FAILED: 'STAFF_CREATE_NEW_RECIPE_FAILED',
  STAFF_EDIT_RECIPE: 'STAFF_EDIT_RECIPE',
  STAFF_EDIT_RECIPE_SUCCEEDED: 'STAFF_EDIT_RECIPE_SUCCEEDED',
  STAFF_EDIT_RECIPE_FAILED: 'STAFF_EDIT_RECIPE_FAILED',
  STAFF_DELETE_RECIPE: 'STAFF_DELETE_RECIPE',
  STAFF_DELETE_RECIPE_SUCCEEDED: 'STAFF_DELETE_RECIPE_SUCCEEDED',
  STAFF_DELETE_RECIPE_FAILED: 'STAFF_DELETE_RECIPE_FAILED'
};

export interface IStaffCreateNewRecipe {
  type: typeof actionTypes.STAFF_CREATE_NEW_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IStaffCreateNewRecipeSucceeded {
  type: typeof actionTypes.STAFF_CREATE_NEW_RECIPE_SUCCEEDED;
  message: string;
}

export interface IStaffCreateNewRecipeFailed {
  type: typeof actionTypes.STAFF_CREATE_NEW_RECIPE_FAILED;
  message: string;
}

export interface IStaffEditRecipe {
  type: typeof actionTypes.STAFF_EDIT_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IStaffEditRecipeSucceeded {
  type: typeof actionTypes.STAFF_EDIT_RECIPE_SUCCEEDED;
  message: string;
}

export interface IStaffEditRecipeFailed {
  type: typeof actionTypes.STAFF_EDIT_RECIPE_FAILED;
  message: string;
}

export interface IStaffDeleteRecipe {
  type: typeof actionTypes.STAFF_DELETE_RECIPE;
  id: number;
}

export interface IStaffDeleteRecipeSucceeded {
  type: typeof actionTypes.STAFF_DELETE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IStaffDeleteRecipeFailed {
  type: typeof actionTypes.STAFF_DELETE_RECIPE_FAILED;
  message: string;
}

export interface ICreatingRecipeInfo {
  ownership: string;
  recipeTypeId: number;
  cuisineId: number;
  title: string;
  description: string;
  directions: string;
  requiredMethods: IRequiredMethod[];
  requiredEquipment: IRequiredEquipment[];
  requiredIngredients: IRequiredIngredient[];
  requiredSubrecipes: IRequiredSubrecipe[];
  recipeImage: string | ArrayBuffer | null;
  recipeFullImage: File | null;
  recipeThumbImage: File | null;
  recipeTinyImage: File | null;
  equipmentImage: string | ArrayBuffer | null;
  equipmentFullImage: File | null;
  ingredientsImage: string | ArrayBuffer | null;
  ingredientsFullImage: File | null;
  cookingImage: string | ArrayBuffer | null;
  cookingFullImage: File | null;
}

export interface IEditingRecipeInfo extends ICreatingRecipeInfo {
  id: number
  recipePrevImage: string;
  equipmentPrevImage: string;
  ingredientsPrevImage: string;
  cookingPrevImage: string;
}

export interface IRequiredMethod {
  id: number;
}

export interface IRequiredEquipment {
  amount: number;
  id: number;
}

export interface IRequiredIngredient {
  amount: number;
  measurementId: number;
  id: number;
}

export interface IRequiredSubrecipe {
  amount: number;
  measurementId: number;
  id: number;
}