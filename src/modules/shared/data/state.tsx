import { createContext, useContext, useReducer }    from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

import type { PlanDataView } from '../../plan/detail/state';

export const DataContext = createContext<InitialData | null>(null);

export const DataDispatchContext = createContext<Dispatch<SetStateAction<InitialData>> | null>(null);

export function DataProvider({ children }: DataProviderProps) {
  const [ data, dispatch ] = useReducer(dataReducer, initialData);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

type DataProviderProps = {
  children: ReactNode;
};

export function useData() {
  const data = useContext(DataContext);
  if (!data) {
    throw new Error("No data context");
  }
  return data;
}

export function useDataDispatch() {
  const dispatch = useContext(DataDispatchContext);
  if (!dispatch) {
    throw new Error("No data dispatch context");
  }
  return dispatch;
}

const initialData: InitialData = {
  cuisines:         [],
  equipment:        [],
  equipment_types:  [],
  ingredients:      [],
  ingredient_types: [],
  units:            [],
  methods:          [],
  //plans:            [],
  //recipes:          [],
  recipe_types:     [],
};

export function dataReducer(data, action) {
  switch (action.type) {
    case 'set_initial_data': {  // is this needed anymore?
      return {
        ...data,
        cuisines:         action.cuisines,
        equipment:        action.equipment,
        equipment_types:  action.equipment_types,
        ingredients:      action.ingredients,
        ingredient_types: action.ingredient_types,
        units:            action.measurements,
        methods:          action.methods,
        //plans:            action.plans,
        //recipes:          action.recipes,
        recipe_types:     action.recipe_types
      };
    }
    case 'set_data': {
      return {
        ...data,
        [action.key]: action.value
      };
    }
    default: {
      throw new Error("Unknown action: ", action.type);
    }
  }
};

export const setInitialData = (initialData: InitialData) => ({
  type: 'set_initial_data',
  ...initialData
});

export const setData = (
  key: keyof InitialData,
  value: Partial<InitialData>
) => ({
  type: 'set_data',
  key,
  value
});

export type InitialData = {
  cuisines:         CuisineView[];
  equipment:        EquipmentView[];
  equipment_types:  EquipmentTypeView[];
  ingredients:      IngredientView[];
  ingredient_types: IngredientTypeView[];
  units:            UnitView[];
  methods:          MethodView[];
  //plans:            PlanView[];
  //recipes:          RecipeOverview[];
  recipe_types:     RecipeTypeView[];
};

export type Actions =
  | SetInitialData
  | SetData;

export type SetInitialData = InitialData & {         
  type: 'set_initial_data';
};

export type SetData = {
  type: 'set_data';
  key:   keyof InitialData;
  value: Partial<InitialData>;
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
