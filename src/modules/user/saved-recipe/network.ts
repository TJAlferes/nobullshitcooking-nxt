import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { getMySavedRecipesSaga }             from '../../private/data/network';
import { actionTypes }                       from './state';
import { SaveRecipe, UnsaveRecipe }          from './state';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export function* saveRecipeWatcher() {
  yield all([
    takeEvery(SAVE_RECIPE,   saveRecipeWorker),
    takeEvery(UNSAVE_RECIPE, unsaveRecipeWorker)
  ]);
}

export function* saveRecipeWorker({ recipe_id }: SaveRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/saved-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* unsaveRecipeWorker({ recipe_id }: UnsaveRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/saved-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
