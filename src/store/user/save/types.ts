export const actionTypes = {
  SAVE_RECIPE:   'SAVE_RECIPE',
  UNSAVE_RECIPE: 'UNSAVE_RECIPE'
} as const;

export interface ISaveRecipe {
  type:     typeof actionTypes.SAVE_RECIPE;
  recipeId: number;
}

export interface IUnsaveRecipe {
  type:     typeof actionTypes.UNSAVE_RECIPE;
  recipeId: number;
}