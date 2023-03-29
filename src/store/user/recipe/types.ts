export const actionTypes = {
  CREATE_PRIVATE_RECIPE: 'CREATE_PRIVATE_RECIPE',
  UPDATE_PRIVATE_RECIPE: 'UPDATE_PRIVATE_RECIPE',
  DELETE_PRIVATE_RECIPE: 'DELETE_PRIVATE_RECIPE',

  CREATE_PUBLIC_RECIPE: 'CREATE_PUBLIC_RECIPE',
  UPDATE_PUBLIC_RECIPE: 'UPDATE_PUBLIC_RECIPE',
  DISOWN_PUBLIC_RECIPE: 'DISOWN_PUBLIC_RECIPE'
} as const;

export interface ICreatePrivateRecipe {
  type:       typeof actionTypes.CREATE_PRIVATE_RECIPE;
  recipeInfo: RecipeInfo;
}

export interface IUpdatePrivateRecipe {
  type:       typeof actionTypes.UPDATE_PRIVATE_RECIPE;
  recipeInfo: RecipeUpdateInfo;
}

export interface IDeletePrivateRecipe {
  type: typeof actionTypes.DELETE_PRIVATE_RECIPE;
  id:   number;
}

export interface ICreatePublicRecipe {
  type:       typeof actionTypes.CREATE_PUBLIC_RECIPE;
  recipeInfo: RecipeInfo;
}

export interface IUpdatePublicRecipe {
  type:       typeof actionTypes.UPDATE_PUBLIC_RECIPE;
  recipeInfo: RecipeUpdateInfo;
}

export interface IDisownPublicRecipe {
  type: typeof actionTypes.DISOWN_PUBLIC_RECIPE;
  id:   number;
}

export type RecipeInfo = {
  ownership:            string;
  recipeTypeId:         number;
  cuisineId:            number;
  title:                string;
  description:          string;
  directions:           string;
  methods:              RequiredMethod[];
  equipment:            RequiredEquipment[];
  ingredients:          RequiredIngredient[];
  subrecipes:           RequiredSubrecipe[];
  recipeImage:          string | ArrayBuffer | null;
  recipeFullImage:      File | null;
  recipeThumbImage:     File | null;
  recipeTinyImage:      File | null;
  equipmentImage:       string | ArrayBuffer | null;
  equipmentFullImage:   File | null;
  ingredientsImage:     string | ArrayBuffer | null;
  ingredientsFullImage: File | null;
  cookingImage:         string | ArrayBuffer | null;
  cookingFullImage:     File | null;
  //video:                string;
};

export type RecipeUpdateInfo = RecipeInfo & {
  id:                   number;
  recipePrevImage:      string;
  equipmentPrevImage:   string;
  ingredientsPrevImage: string;
  cookingPrevImage:     string;
  //prevVideo:            string;
};

export type RequiredMethod = {
  id: number;
};

export type RequiredEquipment = {
  amount: number;
  id:     number;
};

export type RequiredIngredient = {
  amount:        number;
  measurementId: number;
  id:            number;
};

export type RequiredSubrecipe = {
  amount:        number;
  measurementId: number;
  id:            number;
};
