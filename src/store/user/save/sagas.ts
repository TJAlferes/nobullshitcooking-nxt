import axios                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                        from '../../../utils/api';
import { getMySavedRecipesSaga }           from '../../data/sagas';
import { userMessage, userMessageClear }   from '../actions';
import { actionTypes, ISaveRecipe, IUnsaveRecipe } from './types';

export function* saveRecipeSaga({ recipeId }: ISaveRecipe) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/saved-recipe/create`, {recipeId}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* unsaveRecipeSaga({ recipeId }: IUnsaveRecipe) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/saved-recipe/delete`, {withCredentials: true, data: {recipeId}});

    yield put(userMessage(message));
    yield call(getMySavedRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export function* watchSave() {
  yield all([
    takeEvery(SAVE_RECIPE,   saveRecipeSaga),
    takeEvery(UNSAVE_RECIPE, unsaveRecipeSaga)
  ]);
}
