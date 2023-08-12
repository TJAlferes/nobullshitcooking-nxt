import type { PlanData } from '../new-plan/types';

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
  cuisines:         Cuisine[];
  equipment:        Equipment[];
  equipment_types:  EquipmentType[];
  ingredients:      Ingredient[];
  units:            Unit[];
  methods:          Method[];
  ingredient_types: IngredientType[];
  recipes:          WorkRecipe[];
  recipe_types:     RecipeType[];
};

export type InitialUserData = {
  my_favorite_recipes: WorkRecipe[];
  my_friendships:      Friendship[];
  my_plans:            Plan[];
  my_equipment:        Equipment[];
  my_ingredients:      Ingredient[];
  my_private_recipes:  WorkRecipe[];
  my_public_recipes:   WorkRecipe[];
  my_saved_recipes:    WorkRecipe[];
};

// TO DO: move shared types to one location

// TO DO: rename most of these

export type Cuisine = {
  cuisine_id:     number;
  cuisine_name:   string;
  continent_code: string;
  country_code:   string;
  country_name:   string;
};

export type Equipment = {
  equipment_id:        string;
  equipment_type_id:   number;
  owner_id:            number;
  equipment_type_name: string;
  equipment_name:      string;
  description:         string;
  image_url:           string;
};

export type EquipmentType = {
  equipment_type_id:   number;
  equipment_type_name: string;
};

export type Friendship = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};

export type Ingredient = {
  ingredient_id:        string;
  ingredient_type_id:   number;
  owner_id:             number;
  ingredient_type_name: string;
  ingredient_brand:     string | null;
  ingredient_variety:   string | null;
  ingredient_name:      string;
  fullname:             string;
  description:          string;
  image_url:            string;
};

export type IngredientType = {
  ingredient_type_id:   number;
  ingredient_type_name: string;
};

export type Unit = {
  unit_id:   number;
  unit_name: string;
};

export type Method = {
  method_id:   number;
  method_name: string;
};

export type Plan = {
  plan_id:   number;
  plan_name: string;
  //data: PlanData;
};

export type WorkRecipe = {
  recipe_id:      string;
  owner_id:       number;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   string;
};

export type RecipeType = {
  recipe_type_id:   number;
  recipe_type_name: string;
};

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
