import { ICreatingRecipeInfo, IEditingRecipeInfo } from '../../staff/recipe/types';

export type { ICreatingRecipeInfo, IEditingRecipeInfo, IRequiredMethod, IRequiredEquipment, IRequiredIngredient, IRequiredSubrecipe } from '../../staff/recipe/types';

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