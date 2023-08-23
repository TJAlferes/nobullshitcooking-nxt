import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { getMySavedRecipesSaga }             from '../../data/sagas';  // move to shared/data/network?
import { systemMessage, systemMessageClear } from '../../../shared/system-message/state';
import { actionTypes }                       from './state';
import { SaveRecipe, UnsaveRecipe }          from './state';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export function* watchUserSaveRecipe() {
  yield all([
    takeEvery(SAVE_RECIPE,   saveRecipeSaga),
    takeEvery(UNSAVE_RECIPE, unsaveRecipeSaga)
  ]);
}

export function* saveRecipeSaga({ recipe_id }: SaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/saved-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unsaveRecipeSaga({ recipe_id }: UnsaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/saved-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(systemMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
