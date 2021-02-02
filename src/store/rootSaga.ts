import { fork } from 'redux-saga/effects';

import {
  watchAuth,
  watchAvatar,
  watchContent,
  watchData,
  watchEquipment,
  watchFavorite,
  watchFriendship,
  watchIngredient,
  watchMessenger,
  watchPlan,
  watchRecipe,
  watchSave
} from './watchers';

export function* rootSaga() {
  yield fork(watchAuth);
  yield fork(watchAvatar);
  yield fork(watchContent);
  yield fork(watchData);
  yield fork(watchEquipment);
  yield fork(watchFavorite);
  yield fork(watchFriendship);
  yield fork(watchIngredient);
  yield fork(watchMessenger);
  yield fork(watchPlan);
  yield fork(watchRecipe);
  yield fork(watchSave);
}