import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";

import { getItem, setItem } from "../modules/general/localStorage";
import type { PlanDataView } from "../modules/plan/detail";
import { RecipeOverview } from "../modules/plan/form";

function store() {
  const [ cuisines,         setCuisines ]        = useState(getItem("cuisines") || "");
  const [ equipment,        setEquipment ]       = useState(getItem("equipment") || "");
  const [ equipment_types,  setEquipmentTypes ]  = useState(getItem("equipment_types") || "");
  const [ ingredients,      setIngredients ]     = useState(getItem("ingredients") || "");
  const [ ingredient_types, setIngredientTypes ] = useState(getItem("ingredient_types") || "");
  const [ units,            setUnits ]           = useState(getItem("units") || "");
  const [ methods,          setMethods ]         = useState(getItem("methods") || "");
  const [ recipe_types,     setRecipeTypes ]     = useState(getItem("recipe_types") || "");

  const [ theme, setTheme ] = useState<Theme>(getItem("theme") || "");

  const [ my_friendships,         setMyFriendships ]        = useState(getItem("my_friendships") || "");
  const [ my_public_plans,        setMyPublicPlans ]        = useState(getItem("my_public_plans") || "");
  const [ my_public_recipes,      setMyPublicRecipes ]      = useState(getItem("my_public_recipes") || "");
  const [ my_favorite_recipes,    setMyFavoriteRecipes ]    = useState(getItem("my_favorite_recipes") || "");
  const [ my_private_equipment,   setMyPrivateEquipment ]   = useState(getItem("my_private_equipment") || "");
  const [ my_private_ingredients, setMyPrivateIngredients ] = useState(getItem("my_private_ingredients") || "");
  const [ my_private_plans,       setMyPrivatePlans ]       = useState(getItem("my_private_plans") || "");
  const [ my_private_recipes,     setMyPrivateRecipes ]     = useState(getItem("my_private_recipes") || "");
  const [ my_saved_recipes,       setMySavedRecipes ]       = useState(getItem("my_saved_recipes") || "");
  
  const [ auth_id,  setAuthId ]   = useState(getItem("auth_id") || "");
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
    ingredients,
    setIngredients: useCallback((ingredients: IngredientView[]) => {
      setIngredients(ingredients);
      setItem("ingredients", ingredients);
    }, []),
    ingredient_types,
    setIngredientTypes: useCallback((ingredient_types: IngredientTypeView[]) => {
      setIngredientTypes(ingredient_types);
      setItem("ingredient_types", ingredient_types);
    }, []),
    units,
    setUnits: useCallback((units: UnitView[]) => {
      setUnits(units);
      setItem("units", units);
    }, []),
    methods,
    setMethods: useCallback((methods: MethodView[]) => {
      setMethods(methods);
      setItem("methods", methods);
    }, []),
    recipe_types,
    setRecipeTypes: useCallback((recipe_types: RecipeTypeView[]) => {
      setRecipeTypes(recipe_types);
      setItem("recipe_types", recipe_types);
    }, []),

    theme,
    setTheme: useCallback((theme: Theme) => {
      setTheme(theme);
      setItem("theme", theme);
    }, []),

    my_friendships,
    setMyFriendships: useCallback((my_friendships: FriendshipView[]) => {
      setMyFriendships(my_friendships);
      setItem("my_friendships", my_friendships);
    }, []),
    my_public_plans,
    setMyPublicPlans: useCallback((my_public_plans: PlanView[]) => {
      setMyPublicPlans(my_public_plans);
      setItem("my_public_plans", my_public_plans);
    }, []),
    my_public_recipes,
    setMyPublicRecipes: useCallback((my_public_recipes: RecipeOverview[]) => {
      setMyPublicRecipes(my_public_recipes);
      setItem("my_public_recipes", my_public_recipes);
    }, []),
    my_favorite_recipes,
    setMyFavoriteRecipes: useCallback((my_favorite_recipes: RecipeOverview[]) => {
      setMyFavoriteRecipes(my_favorite_recipes);
      setItem("my_favorite_recipes", my_favorite_recipes);
    }, []),
    my_private_equipment,
    setMyPrivateEquipment: useCallback((my_private_equipment: EquipmentView[]) => {
      setMyPrivateEquipment(my_private_equipment);
      setItem("my_private_equipment", my_private_equipment);
    }, []),
    my_private_ingredients,
    setMyPrivateIngredients: useCallback((my_private_ingredients: IngredientView[]) => {
      setMyPrivateIngredients(my_private_ingredients);
      setItem("my_private_ingredients", my_private_ingredients);
    }, []),
    my_private_plans,
    setMyPrivatePlans: useCallback((my_private_plans: PlanView[]) => {
      setMyPrivatePlans(my_private_plans);
      setItem("my_private_plans", my_private_plans);
    }, []),
    my_private_recipes,
    setMyPrivateRecipes: useCallback((my_private_recipes: RecipeOverview[]) => {
      setMyPrivateRecipes(my_private_recipes);
      setItem("my_private_recipes", my_private_recipes);
    }, []),
    my_saved_recipes,
    setMySavedRecipes: useCallback((my_saved_recipes: RecipeOverview[]) => {
      setMySavedRecipes(my_saved_recipes);
      setItem("my_saved_recipes", my_saved_recipes);
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
    }, [])
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

export function useTheme() {
  return useContextSelector(StoreContext, (s) => ({
    theme:    s.theme,
    setTheme: s.setTheme
  }));
}

export function useAuth() {
  return useContextSelector(StoreContext, (s) => ({
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

export type FriendshipView = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};  // FriendView ???

export type PlanView = {
  plan_id:   string;
  owner_id:  string;
  plan_name: string;
  plan_data: PlanDataView;
};

type LoginParams = {
  auth_id:  string;
  authname: string;
};
