// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

export const saveRecipe = (recipe_id: string) =>
  ({type: SAVE_RECIPE, recipe_id});

export const unsaveRecipe = (recipe_id: string) =>
  ({type: UNSAVE_RECIPE, recipe_id});

// types -----------------------------------------------------------------------

export const actionTypes = {
  SAVE_RECIPE:   'SAVE_RECIPE',
  UNSAVE_RECIPE: 'UNSAVE_RECIPE'
} as const;

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export type SaveRecipe = {
  type:      typeof actionTypes.SAVE_RECIPE;
  recipe_id: string;
};

export type UnsaveRecipe = {
  type:      typeof actionTypes.UNSAVE_RECIPE;
  recipe_id: string;
};
