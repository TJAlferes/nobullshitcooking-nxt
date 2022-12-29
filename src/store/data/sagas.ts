import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { dataGetInitialData, dataGetData, dataGetInitialUserData, dataGetUserData } from './actions';
import { IInitialData, IInitialUserData } from './types';

// TO DO: do on ssr server now

export function* dataGetInitialDataSaga() {
  try {
    const { data } = yield call([axios, axios.get], `${endpoint}/data-init`);
    yield put(dataGetInitialData(data));
  } catch (err) {
    //yield put(dataGetInitialDataFailed());
  }
}

export const dataGetContentSaga =           makeDataSaga("/content", "content");
export const dataGetContentTypesSaga =      makeDataSaga("/content-type", "contentTypes");
export const dataGetCuisinesSaga =          makeDataSaga("/cuisine", "cuisines");
export const dataGetEquipmentsSaga =        makeDataSaga("/equipment/official/all", "equipment");
export const dataGetEquipmentTypesSaga =    makeDataSaga("/equipment-type", "equipmentTypes");
export const dataGetIngredientsSaga =       makeDataSaga("/ingredient/official/all", "ingredients");
export const dataGetIngredientTypesSaga =   makeDataSaga("/ingredient-type", "ingredientTypes");
export const dataGetMeasurementsSaga =      makeDataSaga("/measurement", "measurements");
export const dataGetMethodsSaga =           makeDataSaga("/method", "methods");
export const dataGetProductsSaga =          makeDataSaga("/product", "products");
export const dataGetProductCategoriesSaga = makeDataSaga("/product-category", "productCategories");
export const dataGetProductTypesSaga =      makeDataSaga("/product-type", "productTypes");
export const dataGetRecipesSaga =           makeDataSaga("/recipe/official/all", "recipes");
export const dataGetRecipeTypesSaga =       makeDataSaga("/recipe-type", "recipeTypes");

export function* dataGetInitialUserDataSaga() {
  try {
    const { data } = yield call([axios, axios.post], `${endpoint}/user/data-init`, {}, {withCredentials: true});
    yield put(dataGetInitialUserData(data));
  } catch (err) {
    //yield put(dataGetInitialUserDataFailed());
  }
}

export const dataGetMyContentSaga =            makeUserDataSaga("/content/all", "myContent");
export const dataGetMyFavoriteRecipesSaga =    makeUserDataSaga("/favorite-recipe", "myFavoriteRecipes");
export const dataGetMyFriendshipsSaga =        makeUserDataSaga("/friendship", "myFriendships");
export const dataGetMyPlansSaga =              makeUserDataSaga("/plan/all", "myPlans");
export const dataGetMyPrivateEquipmentsSaga =  makeUserDataSaga("/equipment/all", "myPrivateEquipment");
export const dataGetMyPrivateIngredientsSaga = makeUserDataSaga("/ingredient/all", "myPrivateIngredients");
export const dataGetMyPrivateRecipesSaga =     makeUserDataSaga("/recipe/private/all", "myPrivateRecipes");
export const dataGetMyPublicRecipesSaga =      makeUserDataSaga("/recipe/public/all", "myPublicRecipes");
export const dataGetMySavedRecipesSaga =       makeUserDataSaga("/saved-recipe", "mySavedRecipes");

function makeDataSaga(path: string, key: keyof IInitialData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.get], `${endpoint}${path}`);
      yield put(dataGetData(key, data));
    } catch (err) {
      //
    }
  }
}

function makeUserDataSaga(path: string, key: keyof IInitialUserData) {
  return function* () {
    try {
      const { data } = yield call([axios, axios.post], `${endpoint}/user${path}`, {}, {withCredentials: true});
      yield put(dataGetUserData(key, data));
    } catch (err) {
      //
    }
  }
}