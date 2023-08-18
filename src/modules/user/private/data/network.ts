import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint } from '../../../../config/api';
import { getInitialUserData, getUserData, actionTypes } from './state';
import type { InitialUserData } from './state';

const { INIT_USER } = actionTypes;

export function* watchData() {
  yield all([
    takeEvery(INIT_USER, getInitialUserDataSaga),
    //takeEvery(, dataGetSaga),
    //takeEvery(, dataGetSaga)
  ]);
}

export function* getInitialUserDataSaga() {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/data-init`,
      {},
      {withCredentials: true}
    );

    yield put(getInitialUserData(data));
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status code outside of 2xx
      console.log(err.response.status, err.response.data, err.response.headers);
    } else if (err.request) {
      // No response was received -- `err.request` is:
      // an instance of XMLHttpRequest in the browser,
      // an instance of http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);
  }
}

// refetches

export const getMyFavoriteRecipesSaga = makeUserDataSaga("/user/favorite-recipe", "my_favorite_recipes");
export const getMyFriendshipsSaga =     makeUserDataSaga("/user/friendship",      "my_friendships");
export const getMyPlansSaga =           makeUserDataSaga("/user/plan",            "my_plans");
export const getMyEquipmentSaga =       makeUserDataSaga("/user/equipment",       "my_equipment");
export const getMyIngredientsSaga =     makeUserDataSaga("/user/ingredient",      "my_ingredients");
export const getMyPrivateRecipesSaga =  makeUserDataSaga("/user/private/recipe",  "my_private_recipes");
export const getMyPublicRecipesSaga =   makeUserDataSaga("/user/public/recipe",   "my_public_recipes");
export const getMySavedRecipesSaga =    makeUserDataSaga("/user/saved-recipe",    "my_saved_recipes");

function makeUserDataSaga(path: string, key: keyof InitialUserData) {
  return function* () {
    try {
      const { data } = yield call(
        [axios, axios.post],
        `${endpoint}${path}`,
        {},
        {withCredentials: true}
      );

      yield put(getUserData(key, data));
    } catch (err) {
      //
    }
  }
}
