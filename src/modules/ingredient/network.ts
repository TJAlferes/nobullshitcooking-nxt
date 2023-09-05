import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { getMyIngredientsWorker }            from '../data/network';
import { actionTypes } from './state';
import type { CreatePrivateIngredient, UpdatePrivateIngredient, DeletePrivateIngredient } from './state';

const { CREATE_PRIVATE_INGREDIENT, UPDATE_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = actionTypes;

export function* privateIngredientWatcher() {
  yield all([
    takeEvery(CREATE_PRIVATE_INGREDIENT, createPrivateIngredientWorker),
    takeEvery(UPDATE_PRIVATE_INGREDIENT, updatePrivateIngredientWorker),
    takeEvery(DELETE_PRIVATE_INGREDIENT, deletePrivateIngredientWorker)
  ]);
}

export function* createPrivateIngredientWorker(action: CreatePrivateIngredient) {
  let {
    ingredient_type_id,
    ingredient_name,
    notes,
    image,
    fullImage,
    tinyImage
  } = action.ingredient_info;

  try {
    if (fullImage && tinyImage) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/ingredient/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, fullImage);
      yield call(uploadImageToAWSS3, tinySignature, tinyImage);

      image = filename;
    }
    else image = 'nobsc-ingredient-default';

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/ingredient/create`,
      {
        ingredientInfo: {
          ingredient_type_id,
          ingredient_name,
          notes,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyIngredientsWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePrivateIngredientWorker(action: UpdatePrivateIngredient) {
  let {
    ingredient_id,
    ingredient_type_id,
    ingredient_name,
    notes,
    prevImage,
    image,
    fullImage,
    tinyImage
  } = action.ingredient_info;

  try {
    if (fullImage && tinyImage) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/ingredient/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, fullImage);
      yield call(uploadImageToAWSS3, tinySignature, tinyImage);

      image = filename;
    }
    else image = prevImage;

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/ingredient/update`,
      {
        ingredientInfo: {
          ingredient_id,
          ingredient_type_id,
          ingredient_name,
          notes,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyIngredientsWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePrivateIngredientWorker({ ingredient_id }: DeletePrivateIngredient) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/ingredient/delete`,
      {
        withCredentials: true,
        data: {ingredient_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyIngredientsWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
