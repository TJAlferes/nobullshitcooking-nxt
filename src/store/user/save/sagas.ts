import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                              from '../../../utils/api';
import { getMySavedRecipesSaga }                 from '../../data/sagas';
import { userMessage, userMessageClear }         from '../actions';
import { actionTypes, SaveRecipe, UnsaveRecipe } from './types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export function* watchSave() {
  yield all([
    takeEvery(SAVE_RECIPE,   saveRecipeSaga),
    takeEvery(UNSAVE_RECIPE, unsaveRecipeSaga)
  ]);
}

export function* saveRecipeSaga({ recipe_id }: SaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe/create`,
      {recipe_id},
      {withCredentials: true}
    );

    yield put(userMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* unsaveRecipeSaga({ recipe_id }: UnsaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/saved-recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(userMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}
