export const actionTypes = {
  USER_SAVE_RECIPE: 'USER_SAVE_RECIPE',
  USER_SAVE_RECIPE_SUCCEEDED: 'USER_SAVE_RECIPE_SUCCEEDED',
  USER_SAVE_RECIPE_FAILED: 'USER_SAVE_RECIPE_FAILED',
  USER_UNSAVE_RECIPE: 'USER_UNSAVE_RECIPE',
  USER_UNSAVE_RECIPE_SUCCEEDED: 'USER_UNSAVE_RECIPE_SUCCEEDED',
  USER_UNSAVE_RECIPE_FAILED: 'USER_UNSAVE_RECIPE_FAILED'
} as const;

export interface IUserSaveRecipe {
  type: typeof actionTypes.USER_SAVE_RECIPE;
  recipeId: number;
}

export interface IUserSaveRecipeSucceeded {
  type: typeof actionTypes.USER_SAVE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserSaveRecipeFailed {
  type: typeof actionTypes.USER_SAVE_RECIPE_FAILED;
  message: string;
}

export interface IUserUnsaveRecipe {
  type: typeof actionTypes.USER_UNSAVE_RECIPE;
  recipeId: number;
}

export interface IUserUnsaveRecipeSucceeded {
  type: typeof actionTypes.USER_UNSAVE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserUnsaveRecipeFailed {
  type: typeof actionTypes.USER_UNSAVE_RECIPE_FAILED;
  message: string;
}