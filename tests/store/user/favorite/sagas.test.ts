import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import {
  userMessage,
  userMessageClear
} from '../../../../src/store/user/actions';
import {
  userFavoriteRecipeSaga,
  userUnfavoriteRecipeSaga
} from '../../../../src/store/user/favorite/sagas';
import { actionTypes} from '../../../../src/store/user/favorite/types';

const { USER_FAVORITE_RECIPE, USER_UNFAVORITE_RECIPE } = actionTypes;

describe('userFavoriteRecipeSaga', () => {
  const action = {type: USER_FAVORITE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iterator = userFavoriteRecipeSaga(action);
    const res = {data: {message: 'Favorited.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe/create`,
      {recipeId: action.recipeId},
      {withCredentials: true}
    ));

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iterator = userFavoriteRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iterator = userFavoriteRecipeSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('userUnfavoriteRecipeSaga', () => {
  const action = {type: USER_UNFAVORITE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iterator = userUnfavoriteRecipeSaga(action);
    const res = {data: {message: 'Unfavorited.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/favorite-recipe/delete`,
      {withCredentials: true, data: {recipeId: action.recipeId}}
    ));

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iterator = userUnfavoriteRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iterator = userUnfavoriteRecipeSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});