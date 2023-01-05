import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetMyPrivateRecipesSaga, dataGetMyPublicRecipesSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserCreateNewPrivateRecipe, IUserEditPrivateRecipe, IUserDeletePrivateRecipe,
  IUserCreateNewPublicRecipe, IUserEditPublicRecipe, IUserDisownPublicRecipe
} from './types';

export function* userCreateNewRecipeSaga(action: (IUserCreateNewPrivateRecipe | IUserCreateNewPublicRecipe)) {
  let {
    ownership, recipeTypeId, cuisineId,
    title, description, directions,
    methods, equipment, ingredients, subrecipes,
    recipeImage, recipeFullImage, recipeThumbImage, recipeTinyImage,
    equipmentImage, equipmentFullImage,
    ingredientsImage, ingredientsFullImage,
    cookingImage, cookingFullImage
  } = action.recipeInfo;

  try {
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const { data: { fullName, fullSignature, thumbSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe`, {fileType: recipeFullImage.type}, {withCredentials: true});
      
      yield call([axios, axios.put], fullSignature, recipeFullImage, {headers: {'Content-Type': recipeFullImage.type}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': recipeThumbImage.type}});
      yield call([axios, axios.put], tinySignature, recipeTinyImage, {headers: {'Content-Type': recipeTinyImage.type}});

      recipeImage = fullName;
    }
    else recipeImage = "nobsc-recipe-default";


    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.put], `${endpoint}/user/get-signed-url/recipe-equipment`, {fileType: equipmentFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': equipmentFullImage.type}});

      equipmentImage = fullName;
    }
    else equipmentImage = "nobsc-recipe-equipment-default";


    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe-ingredients`, {fileType: ingredientsFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': ingredientsFullImage.type}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = "nobsc-recipe-ingredients-default";


    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe-cooking`, {fileType: cookingFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': cookingFullImage.type}});

      cookingImage = fullName;
    }
    else cookingImage = "nobsc-recipe-cooking-default";


    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/recipe/create`,
      {
        recipeInfo: {
          ownership, recipeTypeId, cuisineId,
          title, description, directions,
          methods, equipment, ingredients, subrecipes,
          recipeImage, equipmentImage, ingredientsImage, cookingImage
        }
      },
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyPrivateRecipesSaga);
    yield call(dataGetMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeletePrivateRecipeSaga(action: IUserDeletePrivateRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/delete/private`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(dataGetMyPrivateRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDisownPublicRecipeSaga(action: IUserDisownPublicRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/disown/public`, {withCredentials: true, data: {id: action.id}});
      
    yield put(userMessage(message));
    yield call(dataGetMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* userEditRecipeSaga(action: (IUserEditPrivateRecipe | IUserEditPublicRecipe)) {
  let {
    id, ownership, recipeTypeId, cuisineId,
    title, description, directions,
    methods, equipment, ingredients, subrecipes,
    recipeImage, recipeFullImage, recipePrevImage, recipeThumbImage, recipeTinyImage,
    equipmentImage, equipmentFullImage, equipmentPrevImage,
    ingredientsImage, ingredientsFullImage, ingredientsPrevImage,
    cookingImage, cookingFullImage, cookingPrevImage
  } = action.recipeInfo;

  try {
    if (recipeFullImage && recipeThumbImage && recipeTinyImage) {
      const { data: { fullName, fullSignature, thumbSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe`, {fileType: recipeFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, recipeFullImage, {headers: {'Content-Type': recipeFullImage.type}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': recipeThumbImage.type}});
      yield call([axios, axios.put], tinySignature, recipeTinyImage, {headers: {'Content-Type': recipeTinyImage.type}});

      recipeImage = fullName;
    }
    else recipeImage = recipePrevImage;


    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe-equipment`, {fileType: equipmentFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': equipmentFullImage.type}});

      equipmentImage = fullName;
    }
    else equipmentImage = equipmentPrevImage;


    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe-ingredients`, {fileType: ingredientsFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': ingredientsFullImage.type}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = ingredientsPrevImage;


    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/get-signed-url/recipe-cooking`, {fileType: cookingFullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': cookingFullImage.type}});

      cookingImage = fullName;
    }
    else cookingImage = cookingPrevImage;
    

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/recipe/update`,
      {
        recipeInfo: {
          id, ownership, recipeTypeId, cuisineId,
          title, description, directions,
          methods, equipment, ingredients, subrecipes,
          recipeImage, recipePrevImage,
          equipmentImage, equipmentPrevImage,
          ingredientsImage, ingredientsPrevImage,
          cookingImage, cookingPrevImage
        }
      },
      {withCredentials: true}
    );
    yield put(userMessage(message));
    yield call(dataGetMyPrivateRecipesSaga);
    yield call(dataGetMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}