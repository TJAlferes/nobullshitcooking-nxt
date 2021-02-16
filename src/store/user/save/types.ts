export const actionTypes = {
  USER_SAVE_RECIPE: 'USER_SAVE_RECIPE',
  USER_UNSAVE_RECIPE: 'USER_UNSAVE_RECIPE'
} as const;

export interface IUserSaveRecipe {
  type: typeof actionTypes.USER_SAVE_RECIPE;
  recipeId: number;
}

export interface IUserUnsaveRecipe {
  type: typeof actionTypes.USER_UNSAVE_RECIPE;
  recipeId: number;
}