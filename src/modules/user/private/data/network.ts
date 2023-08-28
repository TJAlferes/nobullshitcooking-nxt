import axios                         from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                     from '../../../../config/api';
import { setInitialUserData, setUserData, actionTypes } from './state';
import type { InitialUserData }                         from './state';

const { GET_INITIAL_USER_DATA } = actionTypes;

export function* userDataWatcher() {
  yield all([
    takeEvery(GET_INITIAL_USER_DATA, getInitialUserDataWorker)
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

    yield put(setInitialUserData(data));  // rename to set???

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

export const getMyFriendshipsWorker        = createUserDataWorker("/user/friendship",         "my_friendships");
export const getMyFavoriteRecipesWorker    = createUserDataWorker("/user/favorite-recipe",    "my_favorite_recipes");
export const getMyPublicPlansWorker        = createUserDataWorker("/user/public/plan",        "my_public_plans");
export const getMyPublicRecipesWorker      = createUserDataWorker("/user/public/recipe",      "my_public_recipes");
export const getMyPrivateEquipmentWorker   = createUserDataWorker("/user/private/equipment",  "my_private_equipment");
export const getMyPrivateIngredientsWorker = createUserDataWorker("/user/private/ingredient", "my_private_ingredients");
export const getMyPrivatePlansWorker       = createUserDataWorker("/user/private/plan",       "my_private_plans");
export const getMyPrivateRecipesWorker     = createUserDataWorker("/user/private/recipe",     "my_private_recipes");
export const getMySavedRecipesWorker       = createUserDataWorker("/user/saved-recipe",       "my_saved_recipes");

function createUserDataWorker(path: string, key: keyof InitialUserData) {
  return function* () {
    try {
      const { data } = yield call(
        [axios, axios.post],
        `${endpoint}${path}`,
        {},
        {withCredentials: true}
      );

      yield put(setUserData(key, data));
    } catch (err) {}
  }
}
