import { HYDRATE }        from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import type { PlanDataView } from '../../plan/detail/state';

const initialState: State = {
  cuisines:         [],
  equipment:        [],
  equipment_types:  [],
  ingredients:      [],
  ingredient_types: [],
  units:            [],
  methods:          [],
  plans:            [],
  recipes:          [],
  recipe_types:     [],
};

export function dataReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action['payload'].data};  // sufficient?

    case SET_INITIAL_DATA:
      return {
        ...state,
        cuisines:         action['initialData'].cuisines,
        equipment:        action['initialData'].equipment,
        equipment_types:  action['initialData'].equipment_types,
        ingredients:      action['initialData'].ingredients,
        ingredient_types: action['initialData'].ingredient_types,
        units:            action['initialData'].measurements,
        methods:          action['initialData'].methods,
        plans:            action['initialData'].plans,
        recipes:          action['initialData'].recipes,
        recipe_types:     action['initialData'].recipe_types
      };

    case SET_DATA:
      return {...state, [action['data'].key]: action['data'].value};
    
    default: return state;
  }
};



export const getInitialData = () => ({type: GET_INITIAL_DATA});

export const setInitialData = (initialData: InitialData) => ({
  type: SET_INITIAL_DATA,
  initialData
});

export const setData = (
  key: keyof InitialData,
  value: Partial<InitialData>
) => ({
  type: SET_DATA,
  data: {
    key,
    value
  }
});



export const actionTypes = {
  GET_INITIAL_DATA: 'GET_INITIAL_DATA',
  SET_INITIAL_DATA: 'SET_INITIAL_DATA',
  SET_DATA:         'SET_DATA',
} as const;

const {
  GET_INITIAL_DATA,
  SET_INITIAL_DATA,
  SET_DATA,
} = actionTypes;

export type State = InitialData;

export type InitialData = {
  cuisines:         CuisineView[];
  equipment:        EquipmentView[];
  equipment_types:  EquipmentTypeView[];
  ingredients:      IngredientView[];
  ingredient_types: IngredientTypeView[];
  units:            UnitView[];
  methods:          MethodView[];
  plans:            PlanView[];
  recipes:          RecipeOverview[];
  recipe_types:     RecipeTypeView[];
};

export type Actions =
  | GetInitialData
  | SetInitialData
  | SetData;

export type GetInitialData = {
  type: typeof actionTypes.GET_INITIAL_DATA;
};

export type SetInitialData = {         
  type:        typeof actionTypes.SET_INITIAL_DATA;
  initialData: InitialData;
};

export type SetData = {
  type: typeof actionTypes.SET_DATA;
  data: {
    key:   keyof InitialData;
    value: Partial<InitialData>;
  };
};

export type CuisineView = {
  cuisine_id:     number;
  cuisine_name:   string;
  continent_code: string;
  country_code:   string;
  country_name:   string;
};

export type EquipmentView = {
  equipment_id:        string;
  equipment_type_id:   number;
  owner_id:            string;
  equipment_type_name: string;
  equipment_name:      string;
  notes:               string;
  image: {
    image_filename: string;
    caption:        string;
  };
};

export type EquipmentTypeView = {
  equipment_type_id:   number;
  equipment_type_name: string;
};

export type IngredientView = {
  ingredient_id:        string;
  ingredient_type_id:   number;
  owner_id:             string;
  ingredient_type_name: string;
  ingredient_brand:     string | null;
  ingredient_variety:   string | null;
  ingredient_name:      string;
  fullname:             string;
  notes:                string;
  image: {
    image_filename: string;
    caption:        string;
  };
};

export type IngredientTypeView = {
  ingredient_type_id:   number;
  ingredient_type_name: string;
};

export type UnitView = {
  unit_id:   number;
  unit_name: string;
};

export type MethodView = {
  method_id:   number;
  method_name: string;
};

export type PlanView = {
  plan_id:   string;
  owner_id:  string;
  plan_name: string;
  plan_data: PlanDataView;
};

export type RecipeOverview = {
  recipe_id:      string;
  owner_id:       string;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   {
    image_filename: string;
  };
};

export type RecipeTypeView = {
  recipe_type_id:   number;
  recipe_type_name: string;
};
