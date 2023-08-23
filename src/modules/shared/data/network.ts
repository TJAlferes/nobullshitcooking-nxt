import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint } from '../../../config/api';
import { getInitialData, getData, actionTypes } from './state';
import type { InitialData }                     from './state';

const { INIT } = actionTypes;

export function* watchData() {
  yield all([
    takeEvery(INIT, getInitialDataSaga),
    //takeEvery(, dataGetSaga),
    //takeEvery(, dataGetSaga)
  ]);
}

export function* getInitialDataSaga() {
  try {
    const { data } = yield call([axios, axios.get], `${endpoint}/data-init`);
    yield put(getInitialData(data));
  } catch (err) {
    //yield put(getInitialDataFailed());
  }
}

// refetches

export const getCuisinesSaga =          makeDataSaga("/cuisine",         "cuisines");
export const getEquipmentsSaga =        makeDataSaga("/equipment",       "equipment");
export const getEquipmentTypesSaga =    makeDataSaga("/equipment-type",  "equipment_types");
export const getIngredientsSaga =       makeDataSaga("/ingredient",      "ingredients");
export const getIngredientTypesSaga =   makeDataSaga("/ingredient-type", "ingredient_types");
export const getUnitsSaga =             makeDataSaga("/unit",            "units");
export const getMethodsSaga =           makeDataSaga("/method",          "methods");
export const getRecipesSaga =           makeDataSaga("/recipe",          "recipes");
export const getRecipeTypesSaga =       makeDataSaga("/recipe-type",     "recipe_types");

function makeDataSaga(path: string, key: keyof InitialData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.get], `${endpoint}${path}`);

      yield put(getData(key, data));
    } catch (err) {
      //
    }
  }
}
