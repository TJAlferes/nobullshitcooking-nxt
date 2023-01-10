import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import { saveRecipeSaga, unsaveRecipeSaga } from '../../../../src/store/user/save/sagas';
import { actionTypes } from '../../../../src/store/user/save/types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

describe('saveRecipeSaga', () => {
  const action = {type: SAVE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iter = saveRecipeSaga(action);
    const res = {data: {message: 'Saved.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe/create`,
      {recipeId: action.recipeId},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = saveRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = saveRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('unsaveRecipeSaga', () => {
  const action = {type: UNSAVE_RECIPE, recipeId: 99};

  it ('should dispatch succeeded', () => {
    const iter = unsaveRecipeSaga(action);
    const res = {data: {message: 'Unsaved.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/saved-recipe/delete`,
      {withCredentials: true, data: {recipeId: action.recipeId}}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = unsaveRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = unsaveRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});