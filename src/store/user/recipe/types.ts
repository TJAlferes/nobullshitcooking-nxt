export const actionTypes = {
  CREATE_NEW_PRIVATE_RECIPE: 'CREATE_NEW_PRIVATE_RECIPE',
  EDIT_PRIVATE_RECIPE:       'EDIT_PRIVATE_RECIPE',
  DELETE_PRIVATE_RECIPE:     'DELETE_PRIVATE_RECIPE',

  CREATE_NEW_PUBLIC_RECIPE: 'CREATE_NEW_PUBLIC_RECIPE',
  EDIT_PUBLIC_RECIPE:       'EDIT_PUBLIC_RECIPE',
  DISOWN_PUBLIC_RECIPE:     'DISOWN_PUBLIC_RECIPE'
} as const;

export interface ICreateNewPrivateRecipe {
  type:       typeof actionTypes.CREATE_NEW_PRIVATE_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IEditPrivateRecipe {
  type:       typeof actionTypes.EDIT_PRIVATE_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IDeletePrivateRecipe {
  type: typeof actionTypes.DELETE_PRIVATE_RECIPE;
  id:   number;
}

export interface ICreateNewPublicRecipe {
  type:       typeof actionTypes.CREATE_NEW_PUBLIC_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IEditPublicRecipe {
  type:       typeof actionTypes.EDIT_PUBLIC_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IDisownPublicRecipe {
  type: typeof actionTypes.DISOWN_PUBLIC_RECIPE;
  id:   number;
}

export interface ICreatingRecipeInfo {
  ownership:    string;
  recipeTypeId: number;
  cuisineId:    number;
  title:        string;
  description:  string;
  directions:   string;

  methods:      IRequiredMethod[];
  equipment:    IRequiredEquipment[];
  ingredients:  IRequiredIngredient[];
  subrecipes:   IRequiredSubrecipe[];

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

  //video
}

export interface IEditingRecipeInfo extends ICreatingRecipeInfo {
  id:                   number
  recipePrevImage:      string;
  equipmentPrevImage:   string;
  ingredientsPrevImage: string;
  cookingPrevImage:     string;
  //prevVideo
}

export interface IRequiredMethod {
  id: number;
}

export interface IRequiredEquipment {
  amount: number;
  id:     number;
}

export interface IRequiredIngredient {
  amount:        number;
  measurementId: number;
  id:            number;
}

export interface IRequiredSubrecipe {
  amount:        number;
  measurementId: number;
  id:            number;
}
