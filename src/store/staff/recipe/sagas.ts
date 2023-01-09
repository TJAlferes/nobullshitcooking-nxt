import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getRecipesSaga } from '../../data/sagas';
import { staffMessage, staffMessageClear } from '../actions';
import { ICreateNewRecipe, IEditRecipe, IDeleteRecipe } from './types';

export function* createNewRecipeSaga(action: ICreateNewRecipe) {
  let {
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    methods,
    equipment,
    ingredients,
    subrecipes,
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
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const { data: { fullName, fullSignature, thumbSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe`, {fileType: recipeFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, recipeFullImage, {headers: {'Content-Type': recipeFullImage.type}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': recipeThumbImage.type}});
      yield call([axios, axios.put], tinySignature, recipeTinyImage, {headers: {'Content-Type': recipeTinyImage.type}});

      recipeImage = fullName;
    }
    else recipeImage = "nobsc-recipe-default";

    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.put], `${endpoint}/staff/get-signed-url/recipe-equipment`, {fileType: equipmentFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': equipmentFullImage.type}});

      equipmentImage = fullName;
    }
    else equipmentImage = "nobsc-recipe-equipment-default";

    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe-ingredients`, {fileType: ingredientsFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': ingredientsFullImage.type}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = "nobsc-recipe-ingredients-default";

    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe-cooking`, {fileType: cookingFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': cookingFullImage.type}});

      cookingImage = fullName;
    }
    else cookingImage = "nobsc-recipe-cooking-default";

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
          methods,
          equipment,
          ingredients,
          subrecipes,
          recipeImage,
          equipmentImage,
          ingredientsImage,
          cookingImage
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));
    yield call(getRecipesSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* editRecipeSaga(action: IEditRecipe) {
  let {
    id,
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    methods,
    equipment,
    ingredients,
    subrecipes,
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
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const { data: { fullName, fullSignature, thumbSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe`, {fileType: recipeFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, recipeFullImage, {headers: {'Content-Type': recipeFullImage.type}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': recipeThumbImage.type}});
      yield call([axios, axios.put], tinySignature, recipeTinyImage, {headers: {'Content-Type': recipeTinyImage.type}});

      recipeImage = fullName;
    }
    else recipeImage = recipePrevImage;

    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe-equipment`, {fileType: equipmentFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': equipmentFullImage.type}});

      equipmentImage = fullName;
    }
    else equipmentImage = equipmentPrevImage;

    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe-ingredients`, {fileType: ingredientsFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': ingredientsFullImage.type}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = ingredientsPrevImage;

    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/get-signed-url/recipe-cooking`, {fileType: cookingFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': cookingFullImage.type}});

      cookingImage = fullName;
    }
    else cookingImage = cookingPrevImage;

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
          methods,
          equipment,
          ingredients,
          subrecipes,
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
    yield call(getRecipesSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* deleteRecipeSaga(action: IDeleteRecipe) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/staff/recipe/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(staffMessage(message));
    yield call(getRecipesSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}