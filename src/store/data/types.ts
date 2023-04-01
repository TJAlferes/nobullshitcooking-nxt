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

export type State = InitialData & InitialUserData;

export type InitialData = {
  cuisines:          Cuisine[];
  equipment:         Equipment[];
  equipmentTypes:    EquipmentType[];
  ingredients:       Ingredient[];
  measurements:      Measurement[];
  methods:           Method[];
  ingredientTypes:   IngredientType[];
  products:          WorkProduct[];
  productCategories: ProductCategory[];
  productTypes:      ProductType[];
  recipes:           WorkRecipe[];
  recipeTypes:       RecipeType[];
};

export type InitialUserData = {
  myFavoriteRecipes: WorkRecipe[];
  myFriendships:     Friendship[];
  myPlans:           Plan[];
  myEquipment:       Equipment[];
  myIngredients:     Ingredient[];
  //myOrders:          Order[];
  myPrivateRecipes:  WorkRecipe[];
  myPublicRecipes:   WorkRecipe[];
  mySavedRecipes:    WorkRecipe[];
};

export type Cuisine = {
  id:        number;
  continent: string;
  code:      string;
  name:      string;
  country:   string;
};

export type Equipment = {
  id:                  number;
  equipment_type_id:   number;
  owner_id:            number;
  equipment_type_name: string;
  name:                string;
  description:         string;
  image:               string;
};

export type EquipmentType = {
  id:   number;
  name: string;
};

export type Friendship = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};

export type Ingredient = {
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
};

export type IngredientType = {
  id:   number;
  name: string;
};

export type Measurement = {
  id:   number;
  name: string;
};

export type Method = {
  id:   number;
  name: string;
};

export type Plan = {
  id:   number;
  name: string;
  data: IPlannerData;
};

export type WorkRecipe = {
  id:             number;
  owner_id:       number;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   string;
};

export type RecipeType = {
  id:   number;
  name: string;
};

export type WorkProduct = {
  id:                  number;
  product_category_id: number;
  product_type_id:     number;
  brand:               string | null;
  variety:             string | null;
  name:                string;
  fullname:            string;
};

export type ProductCategory = {
  id:   number;
  name: string;
};

export type ProductType = {
  id:   number;
  name: string;
};

/*export type Order = {
  id:       number;
  placed:   string;
  status:   string;
  products: WorkProduct[];
};*/

/*

Actions

*/

export type Actions =
  | Init
  | GetInitialData
  | GetData
  | InitUser
  | GetInitialUserData
  | GetUserData;

export type Init = {
  type: typeof actionTypes.INIT;
};

export type GetInitialData = {         
  type:        typeof actionTypes.GET_INITIAL_DATA;
  initialData: InitialData;
};

export type GetData = {
  type: typeof actionTypes.GET_DATA;
  data: {
    key:   keyof InitialData;
    value: Partial<InitialData>;
  };
};

export type InitUser = {
  type: typeof actionTypes.INIT_USER;
};

export type GetInitialUserData = {
  type:            typeof actionTypes.GET_INITIAL_USER_DATA;
  initialUserData: InitialUserData;
};

export type GetUserData = {
  type: typeof actionTypes.GET_USER_DATA;
  userData: {
    key:   keyof InitialUserData;
    value: Partial<InitialUserData>;
  };
};
