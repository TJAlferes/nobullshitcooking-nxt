export const actionTypes = {
  FAVORITE_RECIPE:   'FAVORITE_RECIPE',
  UNFAVORITE_RECIPE: 'UNFAVORITE_RECIPE'
} as const;

export interface IFavoriteRecipe {
  type:     typeof actionTypes.FAVORITE_RECIPE;
  recipeId: number;
}

export interface IUnfavoriteRecipe {
  type:     typeof actionTypes.UNFAVORITE_RECIPE;
  recipeId: number;
}