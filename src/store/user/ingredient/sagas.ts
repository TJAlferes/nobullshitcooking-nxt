import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getMyIngredientsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type { ICreateIngredient, IUpdateIngredient, IDeleteIngredient } from './types';

export function* createIngredientSaga(action: ICreateIngredient) {
  let { ingredientTypeId, name, description, image, fullImage, tinyImage } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'ingredient'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': 'image/jpeg'}});

      image = fullName;
    }
    else image = 'nobsc-ingredient-default';

    const { data: { message } } =
      yield call([axios, axios.post], `${endpoint}/user/ingredient/create`, {ingredientInfo: {ingredientTypeId, name, description, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* updateIngredientSaga(action: IUpdateIngredient) {
  let { id, ingredientTypeId, name, description, prevImage, image, fullImage, tinyImage } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'ingredient'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': 'image/jpeg'}});

      image = fullName;
    }
    else image = prevImage;

    const { data: { message } } =
      yield call([axios, axios.put], `${endpoint}/user/ingredient/update`, {ingredientInfo: {id, ingredientTypeId, name, description, prevImage, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deleteIngredientSaga(action: IDeleteIngredient) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/ingredient/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}