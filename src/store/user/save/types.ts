export const actionTypes = {
  SAVE_RECIPE:   'SAVE_RECIPE',
  UNSAVE_RECIPE: 'UNSAVE_RECIPE'
} as const;

export type SaveRecipe = {
  type:      typeof actionTypes.SAVE_RECIPE;
  recipe_id: string;
};

export type UnsaveRecipe = {
  type:     typeof actionTypes.UNSAVE_RECIPE;
  recipe_id: string;
};
