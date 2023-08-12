import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import { actionTypes, State } from './types';

const { GET_INITIAL_DATA, GET_DATA, GET_INITIAL_USER_DATA, GET_USER_DATA } = actionTypes;

const initialState: State = {
  cuisines:         [],
  equipment:        [],
  equipment_types:  [],
  ingredients:      [],
  ingredient_types: [],
  units:            [],
  methods:          [],
  recipes:          [],
  recipe_types:     [],
  
  my_favorite_recipes: [],
  my_friendships:      [],
  my_plans:            [],
  my_equipment:        [],
  my_ingredients:      [],
  my_private_recipes:  [],
  my_public_recipes:   [],
  my_saved_recipes:    []
};

export const dataReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE: return {...state, ...action['payload'].data};  // sufficient?

    case GET_INITIAL_DATA:
      return {
        ...state,
        cuisines:         action['initialData'].cuisines,
        equipment:        action['initialData'].equipment,
        equipment_types:  action['initialData'].equipmentTypes,
        ingredients:      action['initialData'].ingredients,
        ingredient_types: action['initialData'].ingredientTypes,
        units:            action['initialData'].measurements,
        methods:          action['initialData'].methods,
        recipes:          action['initialData'].recipes,
        recipe_types:     action['initialData'].recipeTypes
      };

    case GET_DATA: return {...state, [action['data'].key]: action['data'].value};

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

    case GET_USER_DATA: return {...state, [action['userData'].key]: action['userData'].value};
    
    default: return state;
  }
};
