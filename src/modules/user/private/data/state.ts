import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import type { PlanData } from '../new-plan/types';

// TO DO: move into shared/data, and split into user/private/data

const initialState: State = {
  my_favorite_recipes: [],
  my_friendships:      [],
  my_plans:            [],  // TO DO: split into private and public
  my_equipment:        [],  // TO DO: explicitly name my_private_equipment
  my_ingredients:      [],  // TO DO: explicitly name my_private_ingredients
  my_private_recipes:  [],
  my_public_recipes:   [],
  my_saved_recipes:    []
};

export const userDataReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action['payload'].data};  // sufficient?

    case GET_INITIAL_USER_DATA:
      return {
        ...state,
        my_public_recipes:   action['initialUserData'].myPublicRecipes,
        my_equipment:        action['initialUserData'].myEquipment,
        my_ingredients:      action['initialUserData'].myIngredients,
        my_private_recipes:  action['initialUserData'].myPrivateRecipes,
        my_favorite_recipes: action['initialUserData'].myFavoriteRecipes,
        my_saved_recipes:    action['initialUserData'].mySavedRecipes,
        my_plans:            action['initialUserData'].myPlans,
        my_friendships:      action['initialUserData'].myFriendships
      };

    case GET_USER_DATA:
      return {...state, [action['userData'].key]: action['userData'].value};
    
    default: return state;
  }
};



export const initUser = () => ({type: INIT_USER});

export const getInitialUserData = (initialUserData: InitialUserData) =>
  ({type: GET_INITIAL_USER_DATA, initialUserData});

export const getUserData = (
  key:   keyof InitialUserData,
  value: Partial<InitialUserData>
) => ({type: GET_USER_DATA, data: {key, value}});



export const actionTypes = {
  INIT_USER:             'INIT_USER',
  GET_INITIAL_USER_DATA: 'GET_INITIAL_USER_DATA',
  GET_USER_DATA:         'GET_USER_DATA'
} as const;

const {
  INIT_USER,
  GET_INITIAL_USER_DATA,
  GET_USER_DATA
} = actionTypes;

export type State = InitialUserData;

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

export type Actions =
  | InitUser
  | GetInitialUserData
  | GetUserData;

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
  notes:               string;
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
  notes:                string;
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
  plan_id:   string;
  plan_name: string;
  plan_data: PlanData;
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
