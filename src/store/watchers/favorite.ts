import { all, takeEvery } from 'redux-saga/effects';

import {
  userFavoriteRecipeSaga,
  userUnfavoriteRecipeSaga
} from '../user/favorite/sagas';
import { actionTypes } from '../user/favorite/types';

const { USER_FAVORITE_RECIPE, USER_UNFAVORITE_RECIPE } = actionTypes;

export function* watchFavorite() {
  yield all([
    takeEvery(USER_FAVORITE_RECIPE, userFavoriteRecipeSaga),
    takeEvery(USER_UNFAVORITE_RECIPE, userUnfavoriteRecipeSaga)
  ]);
}