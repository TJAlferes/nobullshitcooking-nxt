import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserCreateNewPrivateIngredient,
  IUserEditPrivateIngredient,
  IUserDeletePrivateIngredient
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function* userCreateNewPrivateIngredientSaga(
  action: IUserCreateNewPrivateIngredient
) {
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

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/ingredient`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = 'nobsc-ingredient-default';

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/create`,
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

    yield put(userMessage(message));

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userEditPrivateIngredientSaga(
  action: IUserEditPrivateIngredient
) {
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

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/ingredient`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = prevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/ingredient/update`,
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

    yield put(userMessage(message));

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeletePrivateIngredientSaga(
  action: IUserDeletePrivateIngredient
) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/ingredient/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(userMessage(message));

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}