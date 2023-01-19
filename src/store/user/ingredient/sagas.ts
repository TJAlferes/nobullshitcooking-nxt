import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getMyPrivateIngredientsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type { ICreateNewPrivateIngredient, IEditPrivateIngredient, IDeletePrivateIngredient } from './types';

export function* createNewPrivateIngredientSaga(action: ICreateNewPrivateIngredient) {
  let { ingredientTypeId, name, description, image, fullImage, tinyImage } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url/ingredient`, {fileType: fullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}});

      image = fullName;
    }
    else image = 'nobsc-ingredient-default';

    const { data: { message } } =
      yield call([axios, axios.post], `${endpoint}/user/ingredient/create`, {ingredientInfo: {ingredientTypeId, name, description, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPrivateIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* editPrivateIngredientSaga(action: IEditPrivateIngredient) {
  let { id, ingredientTypeId, name, description, prevImage, image, fullImage, tinyImage } = action.ingredientInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url/ingredient`, {fileType: fullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}});

      image = fullName;
    }
    else image = prevImage;

    const { data: { message } } =
      yield call([axios, axios.put], `${endpoint}/user/ingredient/update`, {ingredientInfo: {id, ingredientTypeId, name, description, prevImage, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPrivateIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deletePrivateIngredientSaga(action: IDeletePrivateIngredient) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/ingredient/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyPrivateIngredientsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}