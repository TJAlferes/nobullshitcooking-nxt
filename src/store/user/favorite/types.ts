export const actionTypes = {
  FAVORITE_RECIPE:   'FAVORITE_RECIPE',
  UNFAVORITE_RECIPE: 'UNFAVORITE_RECIPE'
} as const;

export type FavoriteRecipe = {
  type:     typeof actionTypes.FAVORITE_RECIPE;
  recipeId: number;
};

export type UnfavoriteRecipe = {
  type:     typeof actionTypes.UNFAVORITE_RECIPE;
  recipeId: number;
};
