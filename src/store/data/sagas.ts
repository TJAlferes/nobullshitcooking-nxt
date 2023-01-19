import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { getInitialData, getData, getInitialUserData, getUserData } from './actions';
import type { IInitialData, IInitialUserData } from './types';

// TO DO: do on ssr server now

export function* getInitialDataSaga() {
  try {
    const { data } = yield call([axios, axios.get], `${endpoint}/data-init`);
    yield put(getInitialData(data));
  } catch (err) {
    //yield put(getInitialDataFailed());
  }
}

export const getCuisinesSaga =          makeDataSaga("/cuisine",                 "cuisines");
export const getEquipmentsSaga =        makeDataSaga("/equipment/official/all",  "equipment");
export const getEquipmentTypesSaga =    makeDataSaga("/equipment-type",          "equipmentTypes");
export const getIngredientsSaga =       makeDataSaga("/ingredient/official/all", "ingredients");
export const getIngredientTypesSaga =   makeDataSaga("/ingredient-type",         "ingredientTypes");
export const getMeasurementsSaga =      makeDataSaga("/measurement",             "measurements");
export const getMethodsSaga =           makeDataSaga("/method",                  "methods");
export const getProductsSaga =          makeDataSaga("/product",                 "products");
export const getProductCategoriesSaga = makeDataSaga("/product-category",        "productCategories");
export const getProductTypesSaga =      makeDataSaga("/product-type",            "productTypes");
export const getRecipesSaga =           makeDataSaga("/recipe/official/all",     "recipes");
export const getRecipeTypesSaga =       makeDataSaga("/recipe-type",             "recipeTypes");

export function* getInitialUserDataSaga() {
  try {
    const { data } = yield call([axios, axios.post], `${endpoint}/user/data-init`, {}, {withCredentials: true});
    yield put(getInitialUserData(data));
  } catch (err) {
    //yield put(getInitialUserDataFailed());
  }
}

export const getMyFavoriteRecipesSaga =    makeUserDataSaga("/favorite-recipe",    "myFavoriteRecipes");
export const getMyFriendshipsSaga =        makeUserDataSaga("/friendship",         "myFriendships");
export const getMyPlansSaga =              makeUserDataSaga("/plan/all",           "myPlans");
export const getMyPrivateEquipmentsSaga =  makeUserDataSaga("/equipment/all",      "myPrivateEquipment");
export const getMyPrivateIngredientsSaga = makeUserDataSaga("/ingredient/all",     "myPrivateIngredients");
export const getMyPrivateRecipesSaga =     makeUserDataSaga("/recipe/private/all", "myPrivateRecipes");
export const getMyPublicRecipesSaga =      makeUserDataSaga("/recipe/public/all",  "myPublicRecipes");
export const getMySavedRecipesSaga =       makeUserDataSaga("/saved-recipe",       "mySavedRecipes");

function makeDataSaga(path: string, key: keyof IInitialData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.get], `${endpoint}${path}`);
      yield put(getData(key, data));
    } catch (err) {
      //
    }
  }
}

function makeUserDataSaga(path: string, key: keyof IInitialUserData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.post], `${endpoint}/user${path}`, {}, {withCredentials: true});
      yield put(getUserData(key, data));
    } catch (err) {
      //
    }
  }
}