import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import { actionTypes, IState, Actions } from './types';

const { GET_INITIAL_DATA, GET_DATA, GET_INITIAL_USER_DATA, GET_USER_DATA } = actionTypes;

const initialState: IState = {
  cuisines: [],
  equipment: [],
  equipmentTypes: [],
  ingredients: [],
  ingredientTypes: [],
  measurements: [],
  methods: [],
  products: [],
  productCategories: [],
  productTypes: [],
  recipes: [],
  recipeTypes: [],
  
  myFavoriteRecipes: [],
  myFriendships: [],
  myPlans: [],
  myEquipment: [],
  myIngredients: [],
  myPrivateRecipes: [],
  myPublicRecipes: [],
  mySavedRecipes: []
};

export const dataReducer = (state = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case HYDRATE: return {...state, ...action['payload'].data};  // sufficient?

    case GET_INITIAL_DATA:
      return {
        ...state,
        cuisines:          action['initialData'].cuisines,
        equipment:         action['initialData'].equipment,
        equipmentTypes:    action['initialData'].equipmentTypes,
        ingredients:       action['initialData'].ingredients,
        ingredientTypes:   action['initialData'].ingredientTypes,
        measurements:      action['initialData'].measurements,
        methods:           action['initialData'].methods,
        recipes:           action['initialData'].recipes,
        recipeTypes:       action['initialData'].recipeTypes,
        //products:          action['initialData'].products,
        //productCategories: action['initialData'].productCategories,
        //productTypes:      action['initialData'].productTypes
      };

    case GET_DATA: return {...state, [action['data'].key]: action['data'].value};

    case GET_INITIAL_USER_DATA:
      return {
        ...state,
        //myOrders:          action['initialUserData'].myOrders,
        myPublicRecipes:   action['initialUserData'].myPublicRecipes,
        myEquipment:       action['initialUserData'].myEquipment,
        myIngredients:     action['initialUserData'].myIngredients,
        myPrivateRecipes:  action['initialUserData'].myPrivateRecipes,
        myFavoriteRecipes: action['initialUserData'].myFavoriteRecipes,
        mySavedRecipes:    action['initialUserData'].mySavedRecipes,
        myPlans:           action['initialUserData'].myPlans,
        myFriendships:     action['initialUserData'].myFriendships
      };

    case GET_USER_DATA: return {...state, [action['userData'].key]: action['userData'].value};
    
    default: return state;
  }
};
