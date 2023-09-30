import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode, Reducer } from 'react';

export const DataContext = createContext<Data | null>(null);

export const DataDispatchContext = createContext<Dispatch<Action> | null>(null);

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

const initialData: Data = {
  cuisines:         [],
  equipment:        [],
  equipment_types:  [],
  ingredients:      [],
  ingredient_types: [],
  units:            [],
  methods:          [],
  recipe_types:     []
};

export const dataReducer: Reducer<State, Action> = (data, action) => {
  switch (action.type) {
    case 'set_initial_data': {  // is this needed anymore?
      return {
        ...data,
        cuisines:         action.cuisines,
        equipment:        action.equipment,
        equipment_types:  action.equipment_types,
        ingredients:      action.ingredients,
        ingredient_types: action.ingredient_types,
        units:            action.units,
        methods:          action.methods,
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
      throw new Error("Unknown action");
    }
  }
};

export const setInitialData = (initialData: Data) => ({
  type: 'set_initial_data',
  ...initialData
});

export const setData = (key: keyof Data, value: Partial<Data>) => ({
  type: 'set_data',
  key,
  value
});

type State = Data;

export type Data = {
  cuisines:         CuisineView[];
  equipment:        EquipmentView[];
  equipment_types:  EquipmentTypeView[];
  ingredients:      IngredientView[];
  ingredient_types: IngredientTypeView[];
  units:            UnitView[];
  methods:          MethodView[];
  recipe_types:     RecipeTypeView[];
};

export type Action = SetInitialData | SetData;

export type SetInitialData = Data & {         
  type: 'set_initial_data';
};

export type SetData = {
  type: 'set_data';
  key:   keyof Data;
  value: Partial<Data>;
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
