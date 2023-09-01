import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { getMyPrivateRecipesWorker }         from '../../../shared/data/network';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { actionTypes } from './state';
import type { CreatePrivateRecipe, UpdatePrivateRecipe, DeletePrivateRecipe } from './state';

const { CREATE_PRIVATE_RECIPE, UPDATE_PRIVATE_RECIPE, DELETE_PRIVATE_RECIPE } = actionTypes;

export function* privateRecipeWatcher() {
  yield all([
    takeEvery(CREATE_PRIVATE_RECIPE, createPrivateRecipeWorker),
    takeEvery(UPDATE_PRIVATE_RECIPE, updatePrivateRecipeWorker),
    takeEvery(DELETE_PRIVATE_RECIPE, deletePrivateRecipeWorker)
  ]);
}

export function* createPrivateRecipeWorker(action: CreatePrivateRecipe) {
  let {
    recipe_type_id,
    cuisine_id,
    title,
    description,
    directions,
    required_methods,
    required_equipment,
    required_ingredients,
    required_subrecipes,
    recipeImage,
    recipeFullImage,
    recipeThumbImage,
    recipeTinyImage,
    equipmentImage,
    equipmentFullImage,
    ingredientsImage,
    ingredientsFullImage,
    cookingImage,
    cookingFullImage
  } = action.recipe_info;

  try {
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const {
        data: {
          filename,
          fullSignature,
          thumbSignature,
          tinySignature
        }
      } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe/'},  // 'private-recipe' ???
        {withCredentials: true}
      );
      
      yield call(uploadImageToAWSS3, fullSignature, recipeFullImage);
      yield call(uploadImageToAWSS3, thumbSignature, recipeThumbImage);
      yield call(uploadImageToAWSS3, tinySignature, recipeTinyImage);

      recipeImage = filename;
    }
    else recipeImage = "nobsc-recipe-default";

    if (equipmentFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.put],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-equipment/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, equipmentFullImage);

      equipmentImage = filename;
    }
    else equipmentImage = "nobsc-recipe-equipment-default";

    if (ingredientsFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-ingredients/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, ingredientsFullImage);

      ingredientsImage = filename;
    }
    else ingredientsImage = "nobsc-recipe-ingredients-default";

    if (cookingFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-cooking/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, cookingFullImage);

      cookingImage = filename;
    }
    else cookingImage = "nobsc-recipe-cooking-default";

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/recipe/create`,
      {
        recipeInfo: {
          recipe_type_id,
          cuisine_id,
          title,
          description,
          directions,
          required_methods,
          required_equipment,
          required_ingredients,
          required_subrecipes,
          recipeImage,
          equipmentImage,
          ingredientsImage,
          cookingImage
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyPrivateRecipesWorker);  // OR put(getMyPrivateRecipes()) ???
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePrivateRecipeWorker(action: UpdatePrivateRecipe) {
  let {
    recipe_id,
    recipe_type_id,
    cuisine_id,
    title,
    description,
    directions,
    required_methods,
    required_equipment,
    required_ingredients,
    required_subrecipes,
    recipeImage,
    recipeFullImage,
    recipePrevImage,
    recipeThumbImage,
    recipeTinyImage,
    equipmentImage,
    equipmentFullImage,
    equipmentPrevImage,
    ingredientsImage,
    ingredientsFullImage,
    ingredientsPrevImage,
    cookingImage,
    cookingFullImage,
    cookingPrevImage
  } = action.recipe_info;

  try {
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const {
        data: {
          filename,
          fullSignature,
          thumbSignature,
          tinySignature
        }
      } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, recipeFullImage);
      yield call(uploadImageToAWSS3, thumbSignature, recipeThumbImage);
      yield call(uploadImageToAWSS3, tinySignature, recipeTinyImage);

      recipeImage = filename;
    }
    else recipeImage = recipePrevImage;

    if (equipmentFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-equipment/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, equipmentFullImage);

      equipmentImage = filename;
    }
    else equipmentImage = equipmentPrevImage;

    if (ingredientsFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-ingredients/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, ingredientsFullImage);

      ingredientsImage = filename;
    }
    else ingredientsImage = ingredientsPrevImage;

    if (cookingFullImage) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/recipe-cooking/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, cookingFullImage);

      cookingImage = filename;
    }
    else cookingImage = cookingPrevImage;

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/recipe/update`,
      {
        recipeInfo: {
          recipe_id,
          recipe_type_id,
          cuisine_id,
          title,
          description,
          directions,
          required_methods,
          required_equipment,
          required_ingredients,
          required_subrecipes,
          recipeImage,
          recipePrevImage,
          equipmentImage,
          equipmentPrevImage,
          ingredientsImage,
          ingredientsPrevImage,
          cookingImage,
          cookingPrevImage
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyPrivateRecipesWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePrivateRecipeWorker({ recipe_id }: DeletePrivateRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/recipe/delete`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyPrivateRecipesWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
