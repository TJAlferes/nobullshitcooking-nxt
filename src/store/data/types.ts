import type { IData as IPlannerData } from '../planner/types';

export const actionTypes = {
  INIT:                  'INIT',
  GET_INITIAL_DATA:      'GET_INITIAL_DATA',
  GET_DATA:              'GET_DATA',

  INIT_USER:             'INIT_USER',
  GET_INITIAL_USER_DATA: 'GET_INITIAL_USER_DATA',
  GET_USER_DATA:         'GET_USER_DATA'
} as const;

/*

State

*/

export interface IState extends IInitialData, IInitialUserData {};

export interface IInitialData {
  cuisines:          ICuisine[];
  equipment:         IEquipment[];
  equipmentTypes:    IEquipmentType[];
  ingredients:       IIngredient[];
  measurements:      IMeasurement[];
  methods:           IMethod[];
  ingredientTypes:   IIngredientType[];
  products:          IWorkProduct[];
  productCategories: IProductCategory[];
  productTypes:      IProductType[];
  recipes:           IWorkRecipe[];
  recipeTypes:       IRecipeType[];
}

export interface IInitialUserData {
  myFavoriteRecipes: IWorkRecipe[];
  myFriendships:     IFriendship[];
  myPlans:           IPlan[];
  myEquipment:       IEquipment[];
  myIngredients:     IIngredient[];
  //myOrders: IOrder[];
  myPrivateRecipes:  IWorkRecipe[];
  myPublicRecipes:   IWorkRecipe[];
  mySavedRecipes:    IWorkRecipe[];
}

export interface ICuisine {
  id:     number
  name:   string
  nation: string
}

export interface IEquipment {
  id:                  number;
  equipment_type_id:   number;
  owner_id:            number;
  equipment_type_name: string;
  name:                string;
  description:         string;
  image:               string;
}

export interface IEquipmentType {
  id:   number;
  name: string;
}

export interface IFriendship {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
}

export interface IIngredient {
  id:                   number;
  ingredient_type_id:   number;
  owner_id:             number;
  ingredient_type_name: string;
  brand:                string | null;
  variety:              string | null;
  fullname:             string;
  name:                 string;
  description:          string;
  image:                string;
}

export interface IIngredientType {
  id:   number;
  name: string;
}

export interface IMeasurement {
  id:   number;
  name: string;
}

export interface IMethod {
  id:   number;
  name: string;
}

export interface IPlan {
  id:   number;
  name: string;
  data: IPlannerData;
}

export interface IWorkRecipe {
  id:             number;
  owner_id:       number;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   string;
}

export interface IRecipeType {
  id:   number;
  name: string;
}

export interface IWorkProduct {
  id:                  number;
  product_category_id: number;
  product_type_id:     number;
  brand:               string | null;
  variety:             string | null;
  name:                string;
  fullname:            string;
}

export interface IProductCategory {
  id:   number;
  name: string;
}

export interface IProductType {
  id:   number;
  name: string;
}

/*

Actions

*/

export type Actions =
  IInit |
  IInitUser |
  IGetInitialData |
  IGetData |
  IGetInitialUserData |
  IGetUserData;

export interface IInit {
  type: typeof actionTypes.INIT;
}

export interface IInitUser {
  type: typeof actionTypes.INIT_USER;
}

export interface IGetInitialData {         
  type:        typeof actionTypes.GET_INITIAL_DATA;
  initialData: IInitialData;
}

export interface IGetData {
  type: typeof actionTypes.GET_DATA;
  data: {
    key:   keyof IInitialData;
    value: Partial<IInitialData>;
  };
}

export interface IGetInitialUserData {
  type:            typeof actionTypes.GET_INITIAL_USER_DATA;
  initialUserData: IInitialUserData;
}

export interface IGetUserData {
  type: typeof actionTypes.GET_USER_DATA;
  userData: {
    key:   keyof IInitialUserData;
    value: Partial<IInitialUserData>;
  };
}