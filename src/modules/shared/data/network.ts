import axios                         from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                             from '../../../config/api';
import { getInitialData, getData, actionTypes } from './state';
import type { InitialData }                     from './state';

const { INIT } = actionTypes;

export function* dataWatcher() {
  yield all([
    takeEvery(INIT, getInitialDataWorker)
  ]);
}

export function* getInitialDataWorker() {
  try {
    const { data } = yield call([axios, axios.get], `${endpoint}/initial-data`);
    yield put(getInitialData(data));
  } catch (err) {}
}

// refetches

export const getCuisinesWorker        = createDataWorker("/cuisine",         "cuisines");
export const getEquipmentsWorker      = createDataWorker("/equipment",       "equipment");
export const getEquipmentTypesWorker  = createDataWorker("/equipment-type",  "equipment_types");
export const getIngredientsWorker     = createDataWorker("/ingredient",      "ingredients");
export const getIngredientTypesWorker = createDataWorker("/ingredient-type", "ingredient_types");
export const getUnitsWorker           = createDataWorker("/unit",            "units");
export const getMethodsWorker         = createDataWorker("/method",          "methods");
export const getPlansWorker           = createDataWorker("/plan",            "plans")
export const getRecipesWorker         = createDataWorker("/recipe",          "recipes");
export const getRecipeTypesWorker     = createDataWorker("/recipe-type",     "recipe_types");

function createDataWorker(path: string, key: keyof InitialData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.get], `${endpoint}${path}`);
      yield put(getData(key, data));
    } catch (err) {}
  }
}
