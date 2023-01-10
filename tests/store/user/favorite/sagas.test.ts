import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import { favoriteRecipeSaga, unfavoriteRecipeSaga } from '../../../../src/store/user/favorite/sagas';
import { actionTypes} from '../../../../src/store/user/favorite/types';

const { FAVORITE_RECIPE, UNFAVORITE_RECIPE } = actionTypes;

describe('favoriteRecipeSaga', () => {
  const action = {type: FAVORITE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iter = favoriteRecipeSaga(action);
    const res = {data: {message: 'Favorited.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe/create`,
      {recipeId: action.recipeId},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = favoriteRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = favoriteRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('unfavoriteRecipeSaga', () => {
  const action = {type: UNFAVORITE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iter = unfavoriteRecipeSaga(action);
    const res = {data: {message: 'Unfavorited.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/favorite-recipe/delete`,
      {withCredentials: true, data: {recipeId: action.recipeId}}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = unfavoriteRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = unfavoriteRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});