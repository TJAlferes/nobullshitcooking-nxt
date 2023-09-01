import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { getMyPublicRecipesWorker }          from '../../../shared/data/network';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { actionTypes } from './state';
import type { CreatePublicRecipe, UpdatePublicRecipe, DisownPublicRecipe } from './state';

const { CREATE_PUBLIC_RECIPE, UPDATE_PUBLIC_RECIPE, DISOWN_PUBLIC_RECIPE } = actionTypes;

export function* publicRecipeWatcher() {
  yield all([
    takeEvery(CREATE_PUBLIC_RECIPE, createPublicRecipeWorker),
    takeEvery(UPDATE_PUBLIC_RECIPE, updatePublicRecipeWorker),
    takeEvery(DISOWN_PUBLIC_RECIPE, disownPublicRecipeWorker)
  ]);
}

export function* createPublicRecipeWorker(action: CreatePublicRecipe) {
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
    recipe_image_info,
    equipment_image_info,
    ingredients_image_info,
    cooking_image_info
  } = action.recipe_info;

  try {
    if (recipe_image_info.medium && recipe_image_info.thumb && recipe_image_info.tiny) {
      const {
        data: {
          filename, fullSignature, thumbSignature, tinySignature
        }
      } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'public/recipe/'},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, recipe_image_info.medium);
      yield call(uploadImageToAWSS3, thumbSignature, recipe_image_info.thumb);
      yield call(uploadImageToAWSS3, tinySignature, recipe_image_info.tiny);
      recipe_image_info.name = filename;
    }

    if (equipment_image_info.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.put],
        `${endpoint}/user/signed-url`,
        {subfolder: 'public/recipe-equipment/'},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, equipment_image_info.medium);
      equipment_image_info.name = filename;
    }

    if (ingredients_image_info.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'public/recipe-ingredients/'},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, ingredients_image_info.medium);
      ingredients_image_info.name = filename;
    }

    if (cooking_image_info.medium) {
      const { data: { filename, fullSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'public/recipe-cooking/'},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, cooking_image_info.medium);
      cooking_image_info.name = filename;
    }

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/public/recipe/create`,
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
          recipe_image_info,
          equipment_image_info,
          ingredients_image_info,
          cooking_image_info
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyPublicRecipesWorker);  // OR put(getMyPublicRecipes()) ???
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePublicRecipeWorker(action: UpdatePublicRecipe) {
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
        {subfolder: 'public/recipe/'},
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
        {subfolder: 'public/recipe-equipment/'},
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
        {subfolder: 'public/recipe-ingredients/'},
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
        {subfolder: 'public/recipe-cooking/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, cookingFullImage);

      cookingImage = filename;
    }
    else cookingImage = cookingPrevImage;

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/public/recipe/update`,
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
    yield call(getMyPublicRecipesWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* disownPublicRecipeWorker({ recipe_id }: DisownPublicRecipe) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/public/recipe/disown`,
      {
        withCredentials: true,
        data: {recipe_id}
      }
    );
      
    yield put(systemMessage(data.message));
    yield call(getMyPublicRecipesWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
