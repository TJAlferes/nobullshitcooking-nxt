import { ICreatingRecipeInfo, IEditingRecipeInfo } from '../../staff/recipe/types';

export type { ICreatingRecipeInfo, IEditingRecipeInfo, IRequiredMethod, IRequiredEquipment, IRequiredIngredient, IRequiredSubrecipe } from '../../staff/recipe/types';

export const actionTypes = {
  USER_CREATE_NEW_PRIVATE_RECIPE: 'USER_CREATE_NEW_PRIVATE_RECIPE',
  USER_EDIT_PRIVATE_RECIPE: 'USER_EDIT_PRIVATE_RECIPE',
  USER_DELETE_PRIVATE_RECIPE: 'USER_DELETE_PRIVATE_RECIPE',

  USER_CREATE_NEW_PUBLIC_RECIPE: 'USER_CREATE_NEW_PUBLIC_RECIPE',
  USER_EDIT_PUBLIC_RECIPE: 'USER_EDIT_PUBLIC_RECIPE',
  USER_DISOWN_PUBLIC_RECIPE: 'USER_DISOWN_PUBLIC_RECIPE'
} as const;

export interface IUserCreateNewPrivateRecipe {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IUserEditPrivateRecipe {
  type: typeof actionTypes.USER_EDIT_PRIVATE_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IUserDeletePrivateRecipe {
  type: typeof actionTypes.USER_DELETE_PRIVATE_RECIPE;
  id: number;
}

export interface IUserCreateNewPublicRecipe {
  type: typeof actionTypes.USER_CREATE_NEW_PUBLIC_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IUserEditPublicRecipe {
  type: typeof actionTypes.USER_EDIT_PUBLIC_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IUserDisownPublicRecipe {
  type: typeof actionTypes.USER_DISOWN_PUBLIC_RECIPE;
  id: number;
}