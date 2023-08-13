export const actionTypes = {
  FAVORITE_RECIPE:   'FAVORITE_RECIPE',
  UNFAVORITE_RECIPE: 'UNFAVORITE_RECIPE'
} as const;

export type FavoriteRecipe = {
  type:      typeof actionTypes.FAVORITE_RECIPE;
  recipe_id: string;
};

export type UnfavoriteRecipe = {
  type:      typeof actionTypes.UNFAVORITE_RECIPE;
  recipe_id: string;
};
