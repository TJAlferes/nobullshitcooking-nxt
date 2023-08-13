import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                      from '../../../utils/api';
import { getMyFavoriteRecipesSaga }                      from '../../data/sagas';
import { userMessage, userMessageClear }                 from '../actions';
import { actionTypes, FavoriteRecipe, UnfavoriteRecipe } from './types';

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
      `${endpoint}/user/favorite-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(userMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* unfavoriteRecipeSaga({ recipe_id }: UnfavoriteRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/favorite-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(userMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}
