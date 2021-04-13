import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { userMessage, userMessageClear } from '../actions';
import { IUserSaveRecipe, IUserUnsaveRecipe } from './types';

export function* userSaveRecipeSaga(action: IUserSaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe/create`,
      {recipeId: action.recipeId},
      {withCredentials: true}
    );

    yield put(userMessage(message));
    // refetch here?

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userUnsaveRecipeSaga(action: IUserUnsaveRecipe) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/saved-recipe/delete`,
      {withCredentials: true, data: {recipeId: action.recipeId}}
    );

    yield put(userMessage(message));

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}