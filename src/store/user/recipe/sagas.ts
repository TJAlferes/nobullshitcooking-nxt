import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                        from '../../../utils/api';
import { getMyPrivateRecipesSaga, getMyPublicRecipesSaga } from '../../data/sagas';
import { userMessage, userMessageClear }                   from '../actions';
import {
  actionTypes,
  CreatePrivateRecipe,
  UpdatePrivateRecipe,
  DeletePrivateRecipe,
  CreatePublicRecipe,
  UpdatePublicRecipe,
  DisownPublicRecipe
} from './types';

const {
  CREATE_PRIVATE_RECIPE,
  UPDATE_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE,
  
  CREATE_PUBLIC_RECIPE,
  UPDATE_PUBLIC_RECIPE,
  DISOWN_PUBLIC_RECIPE
} = actionTypes;

export function* watchRecipe() {
  yield all([
    takeEvery(CREATE_PRIVATE_RECIPE, createRecipeSaga),
    takeEvery(UPDATE_PRIVATE_RECIPE, updateRecipeSaga),
    takeEvery(DELETE_PRIVATE_RECIPE, deletePrivateRecipeSaga),

    takeEvery(CREATE_PUBLIC_RECIPE, createRecipeSaga),
    takeEvery(UPDATE_PUBLIC_RECIPE, updateRecipeSaga),
    takeEvery(DISOWN_PUBLIC_RECIPE, disownPublicRecipeSaga)
  ]);
}

export function* createRecipeSaga(action: (CreatePrivateRecipe | CreatePublicRecipe)) {
  let {
    ownership,
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
    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* deletePrivateRecipeSaga({ recipe_id }: DeletePrivateRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/delete/private`, {withCredentials: true, data: {recipe_id}});

    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* disownPublicRecipeSaga({ recipe_id }: DisownPublicRecipe) {
  try {
    const { data: { message } } =
      yield call([axios, axios.delete], `${endpoint}/user/recipe/disown/public`, {withCredentials: true, data: {recipe_id}});
      
    yield put(userMessage(message));
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}

export function* updateRecipeSaga(action: (UpdatePrivateRecipe | UpdatePublicRecipe)) {
  let {
    recipe_id,
    ownership,
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
          recipe_id,
          ownership,
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
    yield put(userMessage(message));
    yield call(getMyPrivateRecipesSaga);
    yield call(getMyPublicRecipesSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }
  yield delay(4000);
  yield put(userMessageClear());
}
