import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";

import { getItem, setItem } from "../modules/general/localStorage";

function store() {
  //const [ data, dataDispatch ] = useReducer(dataReducer, initialData);
  const [ cuisines, setCuisines ] = useState(getItem("cuisines") || "");
  const [ equipment, setEquipment ] = useState(getItem("equipment") || "");
  const [ equipment_types, setEquipmentTypes ] = useState(getItem("equipment_types") || "");
  const [ ingredients, setIngredients ] = useState(getItem("ingredients") || "");
  const [ ingredient_types, setIngredientTypes ] = useState(getItem("ingredient_types") || "");
  const [ units, setUnits ] = useState(getItem("units") || "");
  const [ methods, setMethods ] = useState(getItem("methods") || "");
  const [ recipe_types, setRecipeTypes ] = useState(getItem("recipe_types") || "");
  const [ theme, setTheme ] = useState<Theme>(getItem("theme") || "");

  //const [ user_data, userDataDispatch ] = useReducer(userDataReducer, initialUserData);
  const [ , set ] = useState(getItem("") || "");
  const [ , set ] = useState(getItem("") || "");
  const [ auth_id, setAuthId ]    = useState(getItem("auth_id") || "");
  const [ authname, setAuthname ] = useState(getItem("authname") || "");

  return {
    cuisines,
    setCuisines: useCallback((cuisines: CuisineView[]) => {
      setCuisines(cuisines);
      setItem("cuisines", cuisines);
    }, []),
    equipment,
    setEquipment: useCallback((equipment: EquipmentView[]) => {
      setEquipment(equipment);
      setItem("equipment", equipment);
    }, []),
    equipment_types,
    setEquipmentTypes: useCallback((equipment_types: EquipmentTypeView[]) => {
      setEquipmentTypes(equipment_types);
      setItem("equipment_types", equipment_types);
    }, []),
    
    theme,
    setTheme: useCallback((theme: Theme) => {
      setTheme(theme);
      setItem("theme", theme);
    }, []),
    auth_id,
    authname,
    login: useCallback(({ auth_id, authname }: LoginParams) => {
      setAuthId(auth_id);
      setItem("auth_id", auth_id);
      setAuthname(authname);
      setItem("authname", authname);
    }, []),
    logout: useCallback(() => {
      setAuthId("");
      setItem("auth_id", "");
      setAuthname("");
      setItem("authname", "");
    }, []),

  };
}

const StoreContext = createContext(store());

export function StoreProvider({ children }: StoreContextProviderProps) {
  return (
    <StoreContext.Provider value={store()}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContextSelector(StoreContext, (s) => ({
    theme:    s.theme,
    setTheme: s.setTheme,
    auth_id:  s.auth_id,
    authname: s.authname,
    login:    s.login,
    logout:   s.logout,
  }));
}

type StoreContextProviderProps = {
  children: ReactNode;
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

export type RecipeTypeView = {
  recipe_type_id:   number;
  recipe_type_name: string;
};

type Theme = "light" | "dark";

type LoginParams = {
  auth_id:  string;
  authname: string;
};
