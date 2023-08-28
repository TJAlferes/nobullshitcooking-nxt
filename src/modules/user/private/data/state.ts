import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import type { PlanDataView } from '../../../plan/detail/state';

const initialState: State = {
  my_friendships:         [],
  my_public_plans:        [],
  my_public_recipes:      [],
  my_favorite_recipes:    [],
  my_private_equipment:   [],
  my_private_ingredients: [],
  my_private_plans:       [],
  my_private_recipes:     [],
  my_saved_recipes:       []
};

export function userDataReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action['payload'].data};  // sufficient?

    case GET_INITIAL_USER_DATA:
      return {
        ...state,
        my_friendships:         action['initialUserData'].my_friendships,
        my_public_plans:        action['initialUserData'].my_public_plans,
        my_public_recipes:      action['initialUserData'].my_public_recipes,
        my_favorite_recipes:    action['initialUserData'].my_favorite_recipes,
        my_private_equipment:   action['initialUserData'].my_private_equipment,
        my_private_ingredients: action['initialUserData'].my_private_ingredients,
        my_private_plans:       action['initialUserData'].my_private_plans,
        my_private_recipes:     action['initialUserData'].my_private_recipes,
        my_saved_recipes:       action['initialUserData'].my_saved_recipes
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
  my_friendships:         FriendshipView[];
  my_public_plans:        PlanView[];
  my_public_recipes:      RecipeOverview[];
  my_favorite_recipes:    RecipeOverview[];
  my_private_equipment:   EquipmentView[];
  my_private_ingredients: IngredientView[];
  my_private_plans:       PlanView[];
  my_private_recipes:     RecipeOverview[];
  my_saved_recipes:       RecipeOverview[];
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

export type EquipmentView = {
  equipment_id:        string;
  equipment_type_id:   number;
  owner_id:            number;
  equipment_type_name: string;
  equipment_name:      string;
  notes:               string;
  image_url:           string;
};

export type FriendshipView = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};

export type IngredientView = {
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

export type PlanView = {
  plan_id:   string;
  plan_name: string;
  plan_data: PlanDataView;
};

export type RecipeOverview = {
  recipe_id:      string;
  owner_id:       number;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   string;
};
