import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { endpoint } from '../../../utils/api';
import { getMyFavoriteRecipesSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type { IFavoriteRecipe, IUnfavoriteRecipe } from './types';

export function* favoriteRecipeSaga({ recipeId }: IFavoriteRecipe) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/favorite-recipe/create`, {recipeId}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* unfavoriteRecipeSaga({ recipeId }: IUnfavoriteRecipe) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/favorite-recipe/delete`, {withCredentials: true, data: {recipeId}});

    yield put(userMessage(message));
    yield call(getMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}