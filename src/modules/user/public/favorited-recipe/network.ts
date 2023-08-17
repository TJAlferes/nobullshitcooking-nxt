import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                              from '../../../../config/api';
import { getMyFavoriteRecipesSaga }              from '../../data/sagas';  // move to shared/data/network?
import { systemMessage, systemMessageClear }     from '../../../shared/system-message/state';
import { actionTypes }                           from './state';
import type { FavoriteRecipe, UnfavoriteRecipe } from './state';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export function* watchFavorite() {
  yield all([
    takeEvery(FAVORITE_RECIPE,   favoriteRecipeSaga),
    takeEvery(UNFAVORITE_RECIPE, unfavoriteRecipeSaga)
  ]);
}

export function* favoriteRecipeSaga({ recipe_id }: FavoriteRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/public/favorite-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unfavoriteRecipeSaga({ recipe_id }: UnfavoriteRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/public/favorite-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(systemMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
