import axios                         from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                       from '../../../../config/api';
import { setInitialUserData, setUserData, actionTypes }   from './state';
import type { GetMyPlans, GetMyRecipes, InitialUserData } from './state';

const { GET_INITIAL_USER_DATA, GET_MY_PLANS, GET_MY_RECIPES } = actionTypes;

export function* userDataWatcher() {
  yield all([
    takeEvery(GET_INITIAL_USER_DATA, getInitialUserDataWorker),
    takeEvery(GET_MY_PLANS,          getMyPlansWorker),
    takeEvery(GET_MY_RECIPES,        getMyRecipesWorker)
  ]);
}

export function* getInitialUserDataWorker() {
  try {

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/initial-data`,
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

// /all ???

export const getMyFriendshipsWorker        = createUserDataWorker("/user/friendship",         "my_friendships");
export const getMyPrivateEquipmentWorker   = createUserDataWorker("/user/private/equipment",  "my_private_equipment");
export const getMyPrivateIngredientsWorker = createUserDataWorker("/user/private/ingredient", "my_private_ingredients");
export const getMyFavoriteRecipesWorker    = createUserDataWorker("/user/favorite-recipe",    "my_favorite_recipes");
export const getMySavedRecipesWorker       = createUserDataWorker("/user/saved-recipe",       "my_saved_recipes");

export const getMyPlansWorker = ({ ownership }: GetMyPlans) => {
  if (ownership == 'official') return;
  return createUserDataWorker(`/user/${ownership}/plan`, `my_${ownership}_plans`);
};

export const getMyRecipesWorker = ({ ownership }: GetMyRecipes) => {
  if (ownership == 'official') return;
  return createUserDataWorker(`/user/${ownership}/recipe`, `my_${ownership}_recipes`);
};

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
