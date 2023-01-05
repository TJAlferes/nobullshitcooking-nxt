export const actionTypes = {
  STAFF_CREATE_NEW_RECIPE: 'STAFF_CREATE_NEW_RECIPE',
  STAFF_EDIT_RECIPE:       'STAFF_EDIT_RECIPE',
  STAFF_DELETE_RECIPE:     'STAFF_DELETE_RECIPE'
} as const;

export interface IStaffCreateNewRecipe {
  type:       typeof actionTypes.STAFF_CREATE_NEW_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IStaffEditRecipe {
  type:       typeof actionTypes.STAFF_EDIT_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IStaffDeleteRecipe {
  type: typeof actionTypes.STAFF_DELETE_RECIPE;
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
}

export interface IEditingRecipeInfo extends ICreatingRecipeInfo {
  id:                   number
  recipePrevImage:      string;
  equipmentPrevImage:   string;
  ingredientsPrevImage: string;
  cookingPrevImage:     string;
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