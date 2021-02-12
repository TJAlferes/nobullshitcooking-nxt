import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../config/NOBSCBackendAPIEndpointOne';
import {
  dataGetInitialData,
  dataGetInitialDataFailed,
  dataGetContent,
  dataGetContentFailed,
  dataGetContentTypes,
  dataGetContentTypesFailed,
  dataGetCuisines,
  dataGetCuisinesFailed,
  dataGetEquipments,
  dataGetEquipmentsFailed,
  dataGetEquipmentTypes,
  dataGetEquipmentTypesFailed,
  dataGetIngredients,
  dataGetIngredientsFailed,
  dataGetIngredientTypes,
  dataGetIngredientTypesFailed,
  dataGetMeasurements,
  dataGetMeasurementsFailed,
  dataGetMethods,
  dataGetMethodsFailed,
  dataGetProducts,
  dataGetProductsFailed,
  dataGetProductCategories,
  dataGetProductCategoriesFailed,
  dataGetProductTypes,
  dataGetProductTypesFailed,
  dataGetRecipes,
  dataGetRecipesFailed,
  dataGetRecipeTypes,
  dataGetRecipeTypesFailed,

  dataGetInitialUserData,
  dataGetInitialUserDataFailed,
  dataGetMyContent,
  dataGetMyContentFailed,
  dataGetMyFavoriteRecipes,
  dataGetMyFavoriteRecipesFailed,
  dataGetMyFriendships,
  dataGetMyFriendshipsFailed,
  dataGetMyPlans,
  dataGetMyPlansFailed,
  dataGetMyPrivateEquipments,
  dataGetMyPrivateEquipmentsFailed,
  dataGetMyPrivateIngredients,
  dataGetMyPrivateIngredientsFailed,
  dataGetMyPrivateRecipes,
  dataGetMyPrivateRecipesFailed,
  dataGetMyPublicRecipes,
  dataGetMyPublicRecipesFailed,
  dataGetMySavedRecipes,
  dataGetMySavedRecipesFailed
} from './actions';

const endpoint = NOBSCBackendAPIEndpointOne;

// TO DO: just do on ssr server now
export function* dataGetInitialDataSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/data-init`);
    yield put(dataGetInitialData(res.data));
  } catch (err) {
    yield put(dataGetInitialDataFailed());
  }
}

export function* dataGetContentSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/content`);
    yield put(dataGetContent(res.data));
  } catch (err) {
    yield put(dataGetContentFailed());
  }
}

export function* dataGetContentTypesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/content-type`);
    yield put(dataGetContentTypes(res.data));
  } catch (err) {
    yield put(dataGetContentTypesFailed());
  }
}

export function* dataGetCuisinesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/cuisine`);
    yield put(dataGetCuisines(res.data));
  } catch (err) {
    yield put(dataGetCuisinesFailed());
  }
}

export function* dataGetEquipmentsSaga() {
  try {
    const res = yield call(
      [axios, axios.get],
      `${endpoint}/equipment/official/all`
    );
    yield put(dataGetEquipments(res.data));
  } catch (err) {
    yield put(dataGetEquipmentsFailed());
  }
}

export function* dataGetEquipmentTypesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/equipment-type`);
    yield put(dataGetEquipmentTypes(res.data));
  } catch (err) {
    yield put(dataGetEquipmentTypesFailed());
  }
}

export function* dataGetIngredientsSaga() {
  try {
    const res = yield call(
      [axios, axios.get],
      `${endpoint}/ingredient/official/all`
    );
    yield put(dataGetIngredients(res.data));
  } catch (err) {
    yield put(dataGetIngredientsFailed());
  }
}

export function* dataGetIngredientTypesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/ingredient-type`);
    yield put(dataGetIngredientTypes(res.data));
  } catch (err) {
    yield put(dataGetIngredientTypesFailed());
  }
}

export function* dataGetMeasurementsSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/measurement`);
    yield put(dataGetMeasurements(res.data));
  } catch (err) {
    yield put(dataGetMeasurementsFailed());
  }
}

export function* dataGetMethodsSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/method`);
    yield put(dataGetMethods(res.data));
  } catch (err) {
    yield put(dataGetMethodsFailed());
  }
}

export function* dataGetProductsSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/product`);
    yield put(dataGetProducts(res.data));
  } catch (err) {
    yield put(dataGetProductsFailed());
  }
}

export function* dataGetProductCategoriesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/product-category`);
    yield put(dataGetProductCategories(res.data));
  } catch (err) {
    yield put(dataGetProductCategoriesFailed());
  }
}

export function* dataGetProductTypesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/product-type`);
    yield put(dataGetProductTypes(res.data));
  } catch (err) {
    yield put(dataGetProductTypesFailed());
  }
}

export function* dataGetRecipesSaga() {
  try {
    const res = yield call(
      [axios, axios.get],
      `${endpoint}/recipe/official/all`
    );
    yield put(dataGetRecipes(res.data));
  } catch (err) {
    yield put(dataGetRecipesFailed());
  }
}

export function* dataGetRecipeTypesSaga() {
  try {
    const res = yield call([axios, axios.get], `${endpoint}/recipe-type`);
    yield put(dataGetRecipeTypes(res.data));
  } catch (err) {
    yield put(dataGetRecipeTypesFailed());
  }
}



export function* dataGetInitialUserDataSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/data-init`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetInitialUserData(res.data));
  } catch (err) {
    yield put(dataGetInitialUserDataFailed());
  }
}

export function* dataGetMyContentSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/content/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyContent(res.data));
  } catch (err) {
    yield put(dataGetMyContentFailed());
  }
}

export function* dataGetMyFavoriteRecipesSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyFavoriteRecipes(res.data));
  } catch (err) {
    yield put(dataGetMyFavoriteRecipesFailed());
  }
}

export function* dataGetMyFriendshipsSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/friendship`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyFriendships(res.data));
  } catch (err) {
    yield put(dataGetMyFriendshipsFailed());
  }
}

export function* dataGetMyPlansSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/plan/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyPlans(res.data));
  } catch (err) {
    yield put(dataGetMyPlansFailed());
  }
}

export function* dataGetMyPrivateEquipmentsSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/equipment/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyPrivateEquipments(res.data));
  } catch (err) {
    yield put(dataGetMyPrivateEquipmentsFailed());
  }
}

export function* dataGetMyPrivateIngredientsSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyPrivateIngredients(res.data));
  } catch (err) {
    yield put(dataGetMyPrivateIngredientsFailed());
  }
}

export function* dataGetMyPrivateRecipesSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/recipe/private/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyPrivateRecipes(res.data));
  } catch (err) {
    yield put(dataGetMyPrivateRecipesFailed());
  }
}

export function* dataGetMyPublicRecipesSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/recipe/public/all`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMyPublicRecipes(res.data));
  } catch (err) {
    yield put(dataGetMyPublicRecipesFailed());
  }
}

export function* dataGetMySavedRecipesSaga() {
  try {
    const res = yield call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe`,
      {},
      {withCredentials: true}
    );
    yield put(dataGetMySavedRecipes(res.data));
  } catch (err) {
    yield put(dataGetMySavedRecipesFailed());
  }
}