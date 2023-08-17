// WHY DOES THIS NEED TO BE IN REDUX?

// action creators -------------------------------------------------------------

export const favoriteRecipe = (recipe_id: string) =>
  ({type: FAVORITE_RECIPE, recipe_id});

export const unfavoriteRecipe = (recipe_id: string) =>
  ({type: UNFAVORITE_RECIPE, recipe_id});

// types -----------------------------------------------------------------------

export const actionTypes = {
  FAVORITE_RECIPE:   'FAVORITE_RECIPE',
  UNFAVORITE_RECIPE: 'UNFAVORITE_RECIPE'
} as const;

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export type FavoriteRecipe = {
  type:      typeof actionTypes.FAVORITE_RECIPE;
  recipe_id: string;
};

export type UnfavoriteRecipe = {
  type:      typeof actionTypes.UNFAVORITE_RECIPE;
  recipe_id: string;
};
