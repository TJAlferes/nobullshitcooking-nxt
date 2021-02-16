export const actionTypes = {
  USER_FAVORITE_RECIPE: 'USER_FAVORITE_RECIPE',
  USER_UNFAVORITE_RECIPE: 'USER_UNFAVORITE_RECIPE'
} as const;

export interface IUserFavoriteRecipe {
  type: typeof actionTypes.USER_FAVORITE_RECIPE;
  recipeId: number;
}

export interface IUserUnfavoriteRecipe {
  type: typeof actionTypes.USER_UNFAVORITE_RECIPE;
  recipeId: number;
}