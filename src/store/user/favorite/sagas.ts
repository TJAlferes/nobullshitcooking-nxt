import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetMyFavoriteRecipesSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import { IUserFavoriteRecipe, IUserUnfavoriteRecipe } from './types';

export function* userFavoriteRecipeSaga({ recipeId }: IUserFavoriteRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe/create`,
      {recipeId},
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userUnfavoriteRecipeSaga({ recipeId }: IUserUnfavoriteRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/favorite-recipe/delete`,
      {withCredentials: true, data: {recipeId}}
    );
    yield put(userMessage(message));
    yield call(dataGetMyFavoriteRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}