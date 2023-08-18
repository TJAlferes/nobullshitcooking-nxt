import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import type { PlanData } from '../new-plan/types';

// TO DO: move into shared/data, and split into user/private/data

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
};

export const dataReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action['payload'].data};  // sufficient?

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

    case GET_DATA:
      return {...state, [action['data'].key]: action['data'].value};
    
    default: return state;
  }
};



export const init =     () => ({type: INIT});

export const getInitialData = (initialData: InitialData) =>
  ({type: GET_INITIAL_DATA, initialData});

export const getData = (key: keyof InitialData, value: Partial<InitialData>) =>
  ({type: GET_DATA, data: {key, value}});



export const actionTypes = {
  INIT:             'INIT',
  GET_INITIAL_DATA: 'GET_INITIAL_DATA',
  GET_DATA:         'GET_DATA',
} as const;

const {
  INIT,
  GET_INITIAL_DATA,
  GET_DATA,
} = actionTypes;

export type State = InitialData;

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

export type Actions =
  | Init
  | GetInitialData
  | GetData;

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
