import { IPlannerData } from '../planner/types';

export const actionTypes = {
  DATA_INIT: 'DATA_INIT',
  DATA_GET_INITIAL_DATA: 'DATA_GET_INITIAL_DATA',
  DATA_GET_DATA: 'DATA_GET_DATA',
  DATA_GET_INITIAL_USER_DATA: 'DATA_GET_INITIAL_USER_DATA',
  DATA_GET_USER_DATA: 'DATA_GET_USER_DATA'
} as const;

/*

State

*/

export interface IDataState extends IInitialData, IInitialUserData {};

export interface IInitialData {
  content: IWorkContent[];
  contentTypes: IContentType[];
  cuisines: ICuisine[];
  equipment: IEquipment[];
  equipmentTypes: IEquipmentType[];
  ingredients: IIngredient[];
  measurements: IMeasurement[];
  methods: IMethod[];
  ingredientTypes: IIngredientType[];
  products: IWorkProduct[];
  productCategories: IProductCategory[];
  productTypes: IProductType[];
  recipes: IWorkRecipe[];
  recipeTypes: IRecipeType[];
}

export interface IInitialUserData {
  myContent: IWorkContent[];
  myFavoriteRecipes: IWorkRecipe[];
  myFriendships: IFriendship[];
  myPlans: IPlan[];
  myPrivateEquipment: IEquipment[];
  myPrivateIngredients: IIngredient[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
}

export interface IWorkContent {
  id: number;
  title: string;
  author: string;
  image: string;
  //snippet: string;
}

export interface IContentType {
  id: number;
  parent_id: number;
  name: string;
  path: string;
}

export interface ICuisine {
  id: number
  name: string
  nation: string
}

export interface IEquipment {
  id: number;
  equipment_type_id: number;
  owner_id: number;
  equipment_type_name: string;
  name: string;
  description: string;
  image: string;
}

export interface IEquipmentType {
  id: number;
  name: string;
}

export interface IFriendship {
  user_id: number;
  username: string;
  avatar: string;
  status: string;
}

export interface IIngredient {
  id: number;
  ingredient_type_id: number;
  owner_id: number;
  ingredient_type_name: string;
  brand: string | null;
  variety: string | null;
  name: string;
  description: string;
  image: string;
}

export interface IIngredientType {
  id: number;
  name: string;
}

export interface IMeasurement {
  id: number;
  name: string;
}

export interface IMethod {
  id: number;
  name: string;
}

export interface IPlan {
  id: number;
  name: string;
  data: IPlannerData;
}

export interface IWorkRecipe {
  id: number;
  owner_id: number;
  recipe_type_id: number;
  cuisine_id: number;
  title: string;
  recipe_image: string;
}

export interface IRecipeType {
  id: number;
  name: string;
}

export interface IWorkProduct {
  id: number;
  product_category_id: number;
  product_type_id: number;
  brand: string | null;
  variety: string | null;
  name: string;
  fullname: string;
}

export interface IProductCategory {
  id: number;
  name: string;
}

export interface IProductType {
  id: number;
  name: string;
}

/*

Actions

*/

export type DataActions =
  IDataInit |
  IDataGetInitialData |
  IDataGetData |
  IDataGetInitialUserData |
  IDataGetUserData;

export interface IDataInit {
  type: typeof actionTypes.DATA_INIT;
}

export interface IDataGetInitialData {         
  type: typeof actionTypes.DATA_GET_INITIAL_DATA;
  initialData: IInitialData;
}

export interface IDataGetData {
  type: typeof actionTypes.DATA_GET_DATA;
  data: {
    key: keyof IInitialData;
    value: Partial<IInitialData>;
  };
}

export interface IDataGetInitialUserData {
  type: typeof actionTypes.DATA_GET_INITIAL_USER_DATA;
  initialUserData: IInitialUserData;
}

export interface IDataGetUserData {
  type: typeof actionTypes.DATA_GET_USER_DATA;
  userData: {
    key: keyof IInitialUserData;
    value: Partial<IInitialUserData>;
  };
}