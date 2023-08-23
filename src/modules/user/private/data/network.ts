import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint } from '../../../../config/api';
import { getInitialUserData, getUserData, actionTypes } from './state';
import type { InitialUserData }                         from './state';

const { INIT_USER } = actionTypes;

export function* userDataWatcher() {
  yield all([
    takeEvery(INIT_USER, getInitialUserDataWorker),
    //takeEvery(, dataGetSaga),
    //takeEvery(, dataGetSaga)
  ]);
}

export function* getInitialUserDataWorker() {
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

export const getMyFavoriteRecipesWorker = makeUserDataWorker("/user/favorite-recipe", "my_favorite_recipes");
export const getMyFriendshipsWorker     = makeUserDataWorker("/user/friendship",      "my_friendships");
export const getMyPlansWorker           = makeUserDataWorker("/user/plan",            "my_plans");
export const getMyEquipmentWorker       = makeUserDataWorker("/user/equipment",       "my_equipment");
export const getMyIngredientsWorker     = makeUserDataWorker("/user/ingredient",      "my_ingredients");
export const getMyPrivateRecipesWorker  = makeUserDataWorker("/user/private/recipe",  "my_private_recipes");
export const getMyPublicRecipesWorker   = makeUserDataWorker("/user/public/recipe",   "my_public_recipes");
export const getMySavedRecipesWorker    = makeUserDataWorker("/user/saved-recipe",    "my_saved_recipes");

function makeUserDataWorker(path: string, key: keyof InitialUserData) {
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
