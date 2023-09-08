import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                              from '../../../../config/api';
import { systemMessage, systemMessageClear }     from '../../../shared/system/state';
import { getMyFavoriteRecipesSaga }              from '../../private/data/network';
import { actionTypes }                           from './state';
import type { FavoriteRecipe, UnfavoriteRecipe } from './state';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export function* favoriteRecipeWatcher() {
  yield all([
    takeEvery(FAVORITE_RECIPE,   favoriteRecipeWorker),
    takeEvery(UNFAVORITE_RECIPE, unfavoriteRecipeWorker)
  ]);
}

export function* favoriteRecipeWorker({ recipe_id }: FavoriteRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/public/favorite-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unfavoriteRecipeWorker({ recipe_id }: UnfavoriteRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/public/favorite-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
