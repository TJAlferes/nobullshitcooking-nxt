import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                      from '../../../utils/api';
import { getMyIngredientsSaga }          from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import {
  actionTypes,
  CreateIngredient,
  UpdateIngredient,
  DeleteIngredient
} from './types';

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(CREATE_INGREDIENT, createIngredientSaga),
    takeEvery(UPDATE_INGREDIENT, updateIngredientSaga),
    takeEvery(DELETE_INGREDIENT, deleteIngredientSaga)
  ]);
}

export function* createIngredientSaga(action: CreateIngredient) {
  let {
    ingredient_type_id,
    ingredient_name,
    description,
    image,
    fullImage,
    tinyImage
  } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subBucket: 'ingredient'},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );
      
      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      image = fullName;
    }
    else image = 'nobsc-ingredient-default';

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/create`,
      {
        ingredientInfo: {
          ingredient_type_id,
          ingredient_name,
          description,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* updateIngredientSaga(action: UpdateIngredient) {
  let {
    ingredient_id,
    ingredient_type_id,
    ingredient_name,
    description,
    prevImage,
    image,
    fullImage,
    tinyImage
  } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subBucket: 'ingredient'},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      image = fullName;
    }
    else image = prevImage;

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/ingredient/update`,
      {
        ingredientInfo: {
          ingredient_id,
          ingredient_type_id,
          ingredient_name,
          description,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deleteIngredientSaga({ ingredient_id }: DeleteIngredient) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/ingredient/delete`,
      {
        withCredentials: true,
        data: {ingredient_id}
      }
    );

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}
