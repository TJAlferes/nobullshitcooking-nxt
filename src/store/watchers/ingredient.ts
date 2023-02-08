import { all, takeEvery } from 'redux-saga/effects';

import { createIngredientSaga, updateIngredientSaga, deleteIngredientSaga } from '../user/ingredient/sagas';
import { actionTypes } from '../user/ingredient/types';

const { CREATE_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(CREATE_INGREDIENT, createIngredientSaga),
    takeEvery(UPDATE_INGREDIENT, updateIngredientSaga),
    takeEvery(DELETE_INGREDIENT, deleteIngredientSaga)
  ]);
}