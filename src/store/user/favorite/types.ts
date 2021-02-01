export const actionTypes = {
  USER_FAVORITE_RECIPE: 'USER_FAVORITE_RECIPE',
  USER_FAVORITE_RECIPE_SUCCEEDED: 'USER_FAVORITE_RECIPE_SUCCEEDED',
  USER_FAVORITE_RECIPE_FAILED: 'USER_FAVORITE_RECIPE_FAILED',
  USER_UNFAVORITE_RECIPE: 'USER_UNFAVORITE_RECIPE',
  USER_UNFAVORITE_RECIPE_SUCCEEDED: 'USER_UNFAVORITE_RECIPE_SUCCEEDED',
  USER_UNFAVORITE_RECIPE_FAILED: 'USER_UNFAVORITE_RECIPE_FAILED'
} as const;

export interface IUserFavoriteRecipe {
  type: typeof actionTypes.USER_FAVORITE_RECIPE;
  recipeId: number;
}

export interface IUserFavoriteRecipeSucceeded {
  type: typeof actionTypes.USER_FAVORITE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserFavoriteRecipeFailed {
  type: typeof actionTypes.USER_FAVORITE_RECIPE_FAILED;
  message: string;
}

export interface IUserUnfavoriteRecipe {
  type: typeof actionTypes.USER_UNFAVORITE_RECIPE;
  recipeId: number;
}

export interface IUserUnfavoriteRecipeSucceeded {
  type: typeof actionTypes.USER_UNFAVORITE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserUnfavoriteRecipeFailed {
  type: typeof actionTypes.USER_UNFAVORITE_RECIPE_FAILED;
  message: string;
}