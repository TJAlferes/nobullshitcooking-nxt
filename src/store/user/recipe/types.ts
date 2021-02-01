import {
  ICreatingRecipeInfo,
  IEditingRecipeInfo
} from '../../staff/recipe/types';

export type {
  ICreatingRecipeInfo,
  IEditingRecipeInfo,
  IRequiredMethod,
  IRequiredEquipment,
  IRequiredIngredient,
  IRequiredSubrecipe
} from '../../staff/recipe/types';

export const actionTypes = {
  USER_CREATE_NEW_PRIVATE_RECIPE: 'USER_CREATE_NEW_PRIVATE_RECIPE',
  USER_CREATE_NEW_PRIVATE_RECIPE_SUCCEEDED: 'USER_CREATE_NEW_PRIVATE_RECIPE_SUCCEEDED',
  USER_CREATE_NEW_PRIVATE_RECIPE_FAILED: 'USER_CREATE_NEW_PRIVATE_RECIPE_FAILED',
  USER_EDIT_PRIVATE_RECIPE: 'USER_EDIT_PRIVATE_RECIPE',
  USER_EDIT_PRIVATE_RECIPE_SUCCEEDED: 'USER_EDIT_PRIVATE_RECIPE_SUCCEEDED',
  USER_EDIT_PRIVATE_RECIPE_FAILED: 'USER_EDIT_PRIVATE_RECIPE_FAILED',
  USER_DELETE_PRIVATE_RECIPE: 'USER_DELETE_PRIVATE_RECIPE',
  USER_DELETE_PRIVATE_RECIPE_SUCCEEDED: 'USER_DELETE_PRIVATE_RECIPE_SUCCEEDED',
  USER_DELETE_PRIVATE_RECIPE_FAILED: 'USER_DELETE_PRIVATE_RECIPE_FAILED',

  USER_CREATE_NEW_PUBLIC_RECIPE: 'USER_CREATE_NEW_PUBLIC_RECIPE',
  USER_CREATE_NEW_PUBLIC_RECIPE_SUCCEEDED: 'USER_CREATE_NEW_PUBLIC_RECIPE_SUCCEEDED',
  USER_CREATE_NEW_PUBLIC_RECIPE_FAILED: 'USER_CREATE_NEW_PUBLIC_RECIPE_FAILED',
  USER_EDIT_PUBLIC_RECIPE: 'USER_EDIT_PUBLIC_RECIPE',
  USER_EDIT_PUBLIC_RECIPE_SUCCEEDED: 'USER_EDIT_PUBLIC_RECIPE_SUCCEEDED',
  USER_EDIT_PUBLIC_RECIPE_FAILED: 'USER_EDIT_PUBLIC_RECIPE_FAILED',
  USER_DISOWN_PUBLIC_RECIPE: 'USER_DISOWN_PUBLIC_RECIPE',
  USER_DISOWN_PUBLIC_RECIPE_SUCCEEDED: 'USER_DISOWN_PUBLIC_RECIPE_SUCCEEDED',
  USER_DISOWN_PUBLIC_RECIPE_FAILED: 'USER_DISOWN_PUBLIC_RECIPE_FAILED'
} as const;

export interface IUserCreateNewPrivateRecipe {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IUserCreateNewPrivateRecipeSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserCreateNewPrivateRecipeFailed {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_RECIPE_FAILED;
  message: string;
}

export interface IUserEditPrivateRecipe {
  type: typeof actionTypes.USER_EDIT_PRIVATE_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IUserEditPrivateRecipeSucceeded {
  type: typeof actionTypes.USER_EDIT_PRIVATE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserEditPrivateRecipeFailed {
  type: typeof actionTypes.USER_EDIT_PRIVATE_RECIPE_FAILED;
  message: string;
}

export interface IUserDeletePrivateRecipe {
  type: typeof actionTypes.USER_DELETE_PRIVATE_RECIPE;
  id: number;
}

export interface IUserDeletePrivateRecipeSucceeded {
  type: typeof actionTypes.USER_DELETE_PRIVATE_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserDeletePrivateRecipeFailed {
  type: typeof actionTypes.USER_DELETE_PRIVATE_RECIPE_FAILED;
  message: string;
}

export interface IUserCreateNewPublicRecipe {
  type: typeof actionTypes.USER_CREATE_NEW_PUBLIC_RECIPE;
  recipeInfo: ICreatingRecipeInfo;
}

export interface IUserCreateNewPublicRecipeSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_PUBLIC_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserCreateNewPublicRecipeFailed {
  type: typeof actionTypes.USER_CREATE_NEW_PUBLIC_RECIPE_FAILED;
  message: string;
}

export interface IUserEditPublicRecipe {
  type: typeof actionTypes.USER_EDIT_PUBLIC_RECIPE;
  recipeInfo: IEditingRecipeInfo;
}

export interface IUserEditPublicRecipeSucceeded {
  type: typeof actionTypes.USER_EDIT_PUBLIC_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserEditPublicRecipeFailed {
  type: typeof actionTypes.USER_EDIT_PUBLIC_RECIPE_FAILED;
  message: string;
}

export interface IUserDisownPublicRecipe {
  type: typeof actionTypes.USER_DISOWN_PUBLIC_RECIPE;
  id: number;
}

export interface IUserDisownPublicRecipeSucceeded {
  type: typeof actionTypes.USER_DISOWN_PUBLIC_RECIPE_SUCCEEDED;
  message: string;
}

export interface IUserDisownPublicRecipeFailed {
  type: typeof actionTypes.USER_DISOWN_PUBLIC_RECIPE_FAILED;
  message: string;
}