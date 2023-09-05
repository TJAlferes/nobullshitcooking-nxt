import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import type {
  EquipmentView,
  IngredientView,
  RecipeOverview,
  PlanView
} from '../../../shared/data/state';
import type { Ownership } from '../../../shared/types';

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

    case SET_INITIAL_USER_DATA:
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

    case SET_USER_DATA:
      return {...state, [action['userData'].key]: action['userData'].value};
    
    default: return state;
  }
};



export const getInitialUserData = () => ({type: GET_INITIAL_USER_DATA});

export const getMyPlans = (ownership: Ownership) => ({
  type: GET_MY_PLANS,
  ownership
});

export const getMyRecipes = (ownership: Ownership) => ({
  type: GET_MY_RECIPES,
  ownership
});

export const setInitialUserData = (initialUserData: InitialUserData) => ({
  type: SET_INITIAL_USER_DATA,
  initialUserData
});

export const setUserData = (
  key:   keyof InitialUserData,
  value: Partial<InitialUserData>
) => ({
  type: SET_USER_DATA,
  data: {
    key,
    value
  }
});



export const actionTypes = {
  GET_INITIAL_USER_DATA: 'GET_INITIAL_USER_DATA',
  GET_MY_PLANS:          'GET_MY_PLANS',
  GET_MY_RECIPES:        'GET_MY_RECIPES',
  SET_INITIAL_USER_DATA: 'SET_INITIAL_USER_DATA',
  SET_USER_DATA:         'SET_USER_DATA'
} as const;

const {
  GET_INITIAL_USER_DATA,
  GET_MY_PLANS,
  GET_MY_RECIPES,
  SET_INITIAL_USER_DATA,
  SET_USER_DATA,
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
  | GetInitialUserData
  | GetMyPlans
  | GetMyRecipes
  | SetInitialUserData
  | SetUserData;

export type GetInitialUserData = {
  type: typeof actionTypes.GET_INITIAL_USER_DATA;
};

export type GetMyPlans = {
  type:      typeof actionTypes.GET_MY_PLANS;
  ownership: Ownership;
};

export type GetMyRecipes = {
  type:      typeof actionTypes.GET_MY_RECIPES;
  ownership: Ownership;
};

export type SetInitialUserData = {
  type:            typeof actionTypes.SET_INITIAL_USER_DATA;
  initialUserData: InitialUserData;
};

export type SetUserData = {
  type: typeof actionTypes.SET_USER_DATA;
  userData: {
    key:   keyof InitialUserData;
    value: Partial<InitialUserData>;
  };
};

// TO DO: move shared types to one location

export type FriendshipView = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};  // FriendView ???
