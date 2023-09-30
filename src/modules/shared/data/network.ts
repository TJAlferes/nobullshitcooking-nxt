import axios from 'axios';

import { endpoint } from '../../../config/api';
import { setItem }  from '../../general/localStorage';
import type { Data } from './state';

// move to an api.ts ???

// refetches

export const getCuisines        = createDataFetcher("/cuisines",         "cuisines");  // needed in 3 - 4 places, just get there if navigated to instead of here???
export const getEquipments      = createDataFetcher("/equipment",        "equipment");  //
export const getEquipmentTypes  = createDataFetcher("/equipment-types",  "equipment_types");
export const getIngredients     = createDataFetcher("/ingredients",      "ingredients");  //
export const getIngredientTypes = createDataFetcher("/ingredient-types", "ingredient_types");
export const getUnits           = createDataFetcher("/units",            "units");
export const getMethods         = createDataFetcher("/methods",          "methods");
export const getRecipeTypes     = createDataFetcher("/recipe-types",     "recipe_types");

function createDataFetcher(path: string, key: keyof Data) {
  return async function () {
    try {
      const { data } = await axios.get(`${endpoint}${path}`);
      setItem(key, data);
    } catch (err) {}
  }
}
