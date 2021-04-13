import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import {
  userMessage,
  userMessageClear
} from '../../../../src/store/user/actions';
import {
  userSaveRecipeSaga,
  userUnsaveRecipeSaga
} from '../../../../src/store/user/save/sagas';
import { actionTypes } from '../../../../src/store/user/save/types';

const { USER_SAVE_RECIPE, USER_UNSAVE_RECIPE } = actionTypes;

describe('userSaveRecipeSaga', () => {
  const action = {type: USER_SAVE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iterator = userSaveRecipeSaga(action);
    const res = {data: {message: 'Saved.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe/create`,
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
    const iterator = userSaveRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iterator = userSaveRecipeSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});



describe('userUnsaveRecipeSaga', () => {
  const action = {type: USER_UNSAVE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iterator = userUnsaveRecipeSaga(action);
    const res = {data: {message: 'Unsaved.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/saved-recipe/delete`,
      {withCredentials: true, data: {recipeId: action.recipeId}}
    ));

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iterator = userUnsaveRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(userMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iterator = userUnsaveRecipeSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(userMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});