import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { staffMessage, staffMessageClear } from '../actions';
import {
  IStaffCreateNewRecipe,
  IStaffEditRecipe,
  IStaffDeleteRecipe
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function* staffCreateNewRecipeSaga(action: IStaffCreateNewRecipe) {
  let {
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    requiredMethods,
    requiredEquipment,
    requiredIngredients,
    requiredSubrecipes,
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
  } = action.recipeInfo;

  try {

    // 1
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe`,
        {fileType: recipeFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        recipeFullImage,
        {headers: {'Content-Type': recipeFullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.thumbSignature,
        recipeThumbImage,
        {headers: {'Content-Type': recipeThumbImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        recipeTinyImage,
        {headers: {'Content-Type': recipeTinyImage.type}}
      );

      recipeImage = res1.data.fullName;

    } else {

      recipeImage = "nobsc-recipe-default";

    }

    // 2
    if (equipmentFullImage) {

      const res2 = yield call(
        [axios, axios.put],
        `${endpoint}/staff/get-signed-url/recipe-equipment`,
        {fileType: equipmentFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res2.data.fullSignature,
        equipmentFullImage,
        {headers: {'Content-Type': equipmentFullImage.type}}
      );

      equipmentImage = res2.data.fullName;

    } else {

      equipmentImage = "nobsc-recipe-equipment-default";

    }

    // 3
    if (ingredientsFullImage) {

      const res3 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe-ingredients`,
        {fileType: ingredientsFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res3.data.fullSignature,
        ingredientsFullImage,
        {headers: {'Content-Type': ingredientsFullImage.type}}
      );

      ingredientsImage = res3.data.fullName;

    } else {

      ingredientsImage = "nobsc-recipe-ingredients-default";

    }

    // 4
    if (cookingFullImage) {

      const res4 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe-cooking`,
        {fileType: cookingFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res4.data.fullSignature,
        cookingFullImage,
        {headers: {'Content-Type': cookingFullImage.type}}
      );

      cookingImage = res4.data.fullName;

    } else {

      cookingImage = "nobsc-recipe-cooking-default";

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/staff/recipe/create`,
      {
        recipeInfo: {
          ownership,
          recipeTypeId,
          cuisineId,
          title,
          description,
          directions,
          requiredMethods,
          requiredEquipment,
          requiredIngredients,
          requiredSubrecipes,
          recipeImage,
          equipmentImage,
          ingredientsImage,
          cookingImage
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffEditRecipeSaga(action: IStaffEditRecipe) {
  let {
    id,
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    requiredMethods,
    requiredEquipment,
    requiredIngredients,
    requiredSubrecipes,
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
  } = action.recipeInfo;

  try {

    // 1
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe`,
        {fileType: recipeFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        recipeFullImage,
        {headers: {'Content-Type': recipeFullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.thumbSignature,
        recipeThumbImage,
        {headers: {'Content-Type': recipeThumbImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        recipeTinyImage,
        {headers: {'Content-Type': recipeTinyImage.type}}
      );

      recipeImage = res1.data.fullName;

    } else {

      recipeImage = recipePrevImage;

    }

    // 2
    if (equipmentFullImage) {

      const res2 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe-equipment`,
        {fileType: equipmentFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res2.data.fullSignature,
        equipmentFullImage,
        {headers: {'Content-Type': equipmentFullImage.type}}
      );

      equipmentImage = res2.data.fullName;

    } else {

      equipmentImage = equipmentPrevImage;

    }

    // 3
    if (ingredientsFullImage) {

      const res3 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe-ingredients`,
        {fileType: ingredientsFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res3.data.fullSignature,
        ingredientsFullImage,
        {headers: {'Content-Type': ingredientsFullImage.type}}
      );

      ingredientsImage = res3.data.fullName;

    } else {

      ingredientsImage = ingredientsPrevImage;

    }

    // 4
    if (cookingFullImage) {

      const res4 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/recipe-cooking`,
        {fileType: cookingFullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res4.data.fullSignature,
        cookingFullImage,
        {headers: {'Content-Type': cookingFullImage.type}}
      );

      cookingImage = res4.data.fullName;

    } else {

      cookingImage = cookingPrevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/staff/recipe/update`,
      {
        recipeInfo: {
          id,
          ownership,
          recipeTypeId,
          cuisineId,
          title,
          description,
          directions,
          requiredMethods,
          requiredEquipment,
          requiredIngredients,
          requiredSubrecipes,
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

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffDeleteRecipeSaga(action: IStaffDeleteRecipe) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/staff/recipe/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}