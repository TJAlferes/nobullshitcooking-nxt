import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetIngredientsSaga } from '../../data/sagas';
import { staffMessage, staffMessageClear } from '../actions';
import {
  IStaffCreateNewIngredient,
  IStaffEditIngredient,
  IStaffDeleteIngredient
} from './types';

export function* staffCreateNewIngredientSaga(action: IStaffCreateNewIngredient) {
  let {
    ingredientTypeId,
    name,
    description,
    image,
    fullImage,
    tinyImage
  } = action.ingredientInfo;

  try {

    if (fullImage && tinyImage) {

      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/ingredient`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = fullName;

    } else {

      image = 'nobsc-ingredient-default';

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/staff/ingredient/create`,
      {
        ingredientInfo: {
          ingredientTypeId,
          name,
          description,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));

    yield call(dataGetIngredientsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));
    
  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffEditIngredientSaga(action: IStaffEditIngredient) {
  let {
    id,
    ingredientTypeId,
    name,
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
        `${endpoint}/staff/get-signed-url/ingredient`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = fullName;

    } else {

      image = prevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/staff/ingredient/update`,
      {
        ingredientInfo: {
          id,
          ingredientTypeId,
          name,
          description,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));

    yield call(dataGetIngredientsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffDeleteIngredientSaga(action: IStaffDeleteIngredient) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/staff/ingredient/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(staffMessage(message));

    yield call(dataGetIngredientsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}