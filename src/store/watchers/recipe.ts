import { all, takeEvery } from 'redux-saga/effects';

import {
  createRecipeSaga,
  updateRecipeSaga,
  deletePrivateRecipeSaga,
  disownPublicRecipeSaga
} from '../user/recipe/sagas';
import { actionTypes } from '../user/recipe/types';

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