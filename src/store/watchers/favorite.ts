import { all, takeEvery } from 'redux-saga/effects';

import { favoriteRecipeSaga, unfavoriteRecipeSaga } from '../user/favorite/sagas';
import { actionTypes } from '../user/favorite/types';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

export function* watchFavorite() {
  yield all([
    takeEvery(FAVORITE_RECIPE,   favoriteRecipeSaga),
    takeEvery(UNFAVORITE_RECIPE, unfavoriteRecipeSaga)
  ]);
}