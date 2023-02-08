import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { getInitialData, getData, getInitialUserData, getUserData } from './actions';
import type { IInitialData, IInitialUserData } from './types';

export function* getInitialDataSaga() {
  try {
    const { data } = yield call([axios, axios.get], `${endpoint}/data-init`);
    yield put(getInitialData(data));
  } catch (err) {
    //yield put(getInitialDataFailed());
  }
}

export function* getInitialUserDataSaga() {
  try {
    const { data } = yield call([axios, axios.post], `${endpoint}/user/data-init`, {}, {withCredentials: true});
    yield put(getInitialUserData(data));
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status code outside of 2xx
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // No response was received
      // `err.request` is: an instance of XMLHttpRequest in the browser, an instance of http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);
  }
}

// refetches

export const getCuisinesSaga =          makeDataSaga("/cuisine",          "cuisines");
export const getEquipmentsSaga =        makeDataSaga("/equipment",        "equipment");
export const getEquipmentTypesSaga =    makeDataSaga("/equipment-type",   "equipmentTypes");
export const getIngredientsSaga =       makeDataSaga("/ingredient",       "ingredients");
export const getIngredientTypesSaga =   makeDataSaga("/ingredient-type",  "ingredientTypes");
export const getMeasurementsSaga =      makeDataSaga("/measurement",      "measurements");
export const getMethodsSaga =           makeDataSaga("/method",           "methods");
export const getProductsSaga =          makeDataSaga("/product",          "products");
export const getProductCategoriesSaga = makeDataSaga("/product-category", "productCategories");
export const getProductTypesSaga =      makeDataSaga("/product-type",     "productTypes");
export const getRecipesSaga =           makeDataSaga("/recipe",           "recipes");
export const getRecipeTypesSaga =       makeDataSaga("/recipe-type",      "recipeTypes");

export const getMyFavoriteRecipesSaga = makeUserDataSaga("/user/favorite-recipe", "myFavoriteRecipes");
export const getMyFriendshipsSaga =     makeUserDataSaga("/user/friendship",      "myFriendships");
export const getMyPlansSaga =           makeUserDataSaga("/user/plan",            "myPlans");
export const getMyEquipmentSaga =       makeUserDataSaga("/user/equipment",       "myEquipment");
export const getMyIngredientsSaga =     makeUserDataSaga("/user/ingredient",      "myIngredients");
//export const getMyOrdersSaga =          makeUserDataSaga("/user/order",           "myOrders");
export const getMyPrivateRecipesSaga =  makeUserDataSaga("/user/recipe/private",  "myPrivateRecipes");
export const getMyPublicRecipesSaga =   makeUserDataSaga("/user/recipe/public",   "myPublicRecipes");
export const getMySavedRecipesSaga =    makeUserDataSaga("/user/saved-recipe",    "mySavedRecipes");

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
      const { data } = yield call([axios, axios.post], `${endpoint}${path}`, {}, {withCredentials: true});
      yield put(getUserData(key, data));
    } catch (err) {
      //
    }
  }
}
