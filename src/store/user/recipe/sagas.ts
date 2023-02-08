import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getMyPrivateRecipesSaga, getMyPublicRecipesSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type {
  ICreatePrivateRecipe,
  IUpdatePrivateRecipe,
  IDeletePrivateRecipe,

  ICreatePublicRecipe,
  IUpdatePublicRecipe,
  IDisownPublicRecipe
} from './types';

export function* createRecipeSaga(action: (ICreatePrivateRecipe | ICreatePublicRecipe)) {
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
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe'}, {withCredentials: true});
      
      yield call([axios, axios.put], fullSignature,  recipeFullImage,  {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature,  recipeTinyImage,  {headers: {'Content-Type': 'image/jpeg'}});

      recipeImage = fullName;
    }
    else recipeImage = "nobsc-recipe-default";


    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.put], `${endpoint}/user/signed-url`, {subBucket: 'recipe-equipment'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      equipmentImage = fullName;
    }
    else equipmentImage = "nobsc-recipe-equipment-default";


    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe-ingredients'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = "nobsc-recipe-ingredients-default";


    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe-cooking'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      cookingImage = fullName;
    }
    else cookingImage = "nobsc-recipe-cooking-default";


    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/recipe/create`,
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
    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* deletePrivateRecipeSaga(action: IDeletePrivateRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/delete/private`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* disownPublicRecipeSaga(action: IDisownPublicRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/disown/public`, {withCredentials: true, data: {id: action.id}});
      
    yield put(userMessage(message));
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* updateRecipeSaga(action: (IUpdatePrivateRecipe | IUpdatePublicRecipe)) {
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
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature,  recipeFullImage,  {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], thumbSignature, recipeThumbImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature,  recipeTinyImage,  {headers: {'Content-Type': 'image/jpeg'}});

      recipeImage = fullName;
    }
    else recipeImage = recipePrevImage;


    if (equipmentFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe-equipment'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, equipmentFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      equipmentImage = fullName;
    }
    else equipmentImage = equipmentPrevImage;


    if (ingredientsFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe-ingredients'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, ingredientsFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      ingredientsImage = fullName;
    }
    else ingredientsImage = ingredientsPrevImage;


    if (cookingFullImage) {
      const { data: { fullName, fullSignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'recipe-cooking'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, cookingFullImage, {headers: {'Content-Type': 'image/jpeg'}});

      cookingImage = fullName;
    }
    else cookingImage = cookingPrevImage;
    

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/recipe/update`,
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
    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}