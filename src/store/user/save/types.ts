export const actionTypes = {
  SAVE_RECIPE:   'SAVE_RECIPE',
  UNSAVE_RECIPE: 'UNSAVE_RECIPE'
} as const;

export type SaveRecipe = {
  type:     typeof actionTypes.SAVE_RECIPE;
  recipeId: number;
};

export type UnsaveRecipe = {
  type:     typeof actionTypes.UNSAVE_RECIPE;
  recipeId: number;
};
