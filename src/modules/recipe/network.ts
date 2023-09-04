import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                      from '../../config/api';
import { systemMessage, systemMessageClear }             from '../shared/system/state';
import { getMyRecipes }                                  from '../user/private/data/state';
import { actionTypes }                                   from './state';
import type { CreateRecipe, UpdateRecipe, DeleteRecipe } from './state';

const { CREATE_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } = actionTypes;

export function* recipeWatcher() {
  yield all([
    takeEvery(CREATE_RECIPE, createRecipeWorker),
    takeEvery(UPDATE_RECIPE, updateRecipeWorker),
    takeEvery(DELETE_RECIPE, deleteRecipeWorker)
  ]);
}

export function* createRecipeWorker({ ownership, recipe_upload }: CreateRecipe) {
  const {
    recipe_image,
    equipment_image,
    ingredients_image,
    cooking_image
  } = recipe_upload;

  try {
    // upload any images to AWS S3, then insert info into MySQL

    if (recipe_image.medium && recipe_image.thumb && recipe_image.tiny) {
      const { data: { filename, fullSignature, thumbSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, recipe_image.medium);
      yield call(uploadImageToAWSS3, thumbSignature, recipe_image.thumb);
      yield call(uploadImageToAWSS3, tinySignature, recipe_image.tiny);
      recipe_image.image_filename = filename;
      // remove Files
      recipe_image.medium = null;
      recipe_image.thumb  = null;
      recipe_image.tiny   = null;
    }

    if (equipment_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.put],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-equipment/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, equipment_image.medium);
      equipment_image.image_filename = filename;
      equipment_image.medium = null;
    }

    if (ingredients_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-ingredients/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, ingredients_image.medium);
      ingredients_image.image_filename = filename;
      ingredients_image.medium = null;
    }

    if (cooking_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-cooking/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, cooking_image.medium);
      cooking_image.image_filename = filename;
      cooking_image.medium = null;
    }

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/${ownership}/recipe/create`,
      recipe_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield put(getMyRecipes(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updateRecipeWorker({ ownership, recipe_update_upload }: UpdateRecipe) {
  let {
    recipe_image,
    equipment_image,
    ingredients_image,
    cooking_image
  } = recipe_update_upload;

  try {
    // upload any images to AWS S3, then insert info into MySQL

    if (recipe_image.medium && recipe_image.thumb && recipe_image.tiny) {
      const { data: { filename, fullSignature, thumbSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe/`},
        {withCredentials: true}
      );  // put ???
      yield call(uploadImageToAWSS3, fullSignature, recipe_image.medium);
      yield call(uploadImageToAWSS3, thumbSignature, recipe_image.thumb);
      yield call(uploadImageToAWSS3, tinySignature, recipe_image.tiny);
      recipe_image.image_filename = filename;
      // remove Files
      recipe_image.medium = null;
      recipe_image.thumb  = null;
      recipe_image.tiny   = null;
    }

    if (equipment_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.put],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-equipment/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, equipment_image.medium);
      equipment_image.image_filename = filename;
      equipment_image.medium = null;
    }

    if (ingredients_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-ingredients/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, ingredients_image.medium);
      ingredients_image.image_filename = filename;
      ingredients_image.medium = null;
    }

    if (cooking_image.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/recipe-cooking/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, cooking_image.medium);
      cooking_image.image_filename = filename;
      cooking_image.medium = null;
    }

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/${ownership}/recipe/update`,
      recipe_update_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield put(getMyRecipes(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deleteRecipeWorker({ ownership, recipe_id }: DeleteRecipe) {
  const server_action = ownership === "private" ? "delete" : "disown";

  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/${ownership}/recipe/${server_action}`,
      {withCredentials: true, data: {recipe_id}}
    );
      
    yield put(systemMessage(data.message));
    yield put(getMyRecipes(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
