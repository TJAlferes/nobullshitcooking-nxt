import { fork } from 'redux-saga/effects';

import {
  watchAuth,
  watchAvatar,
  watchChat,
  //watchData,
  watchEquipment,
  watchFavorite,
  watchFriendship,
  watchIngredient,
  watchPlan,
  watchRecipe,
  watchSave
} from './watchers';

export function* rootSaga() {
  yield fork(watchAuth);
  yield fork(watchAvatar);
  yield fork(watchChat);
  //yield fork(watchData);
  yield fork(watchEquipment);
  yield fork(watchFavorite);
  yield fork(watchFriendship);
  yield fork(watchIngredient);
  yield fork(watchPlan);
  yield fork(watchRecipe);
  yield fork(watchSave);
}