import { all, takeEvery } from 'redux-saga/effects';

import { createNewPrivateIngredientSaga, editPrivateIngredientSaga, deletePrivateIngredientSaga } from '../user/ingredient/sagas';
import { actionTypes as userIngredientActionTypes } from '../user/ingredient/types';

const { CREATE_NEW_PRIVATE_INGREDIENT, EDIT_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = userIngredientActionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(CREATE_NEW_PRIVATE_INGREDIENT, createNewPrivateIngredientSaga),
    takeEvery(EDIT_PRIVATE_INGREDIENT,       editPrivateIngredientSaga),
    takeEvery(DELETE_PRIVATE_INGREDIENT,     deletePrivateIngredientSaga)
  ]);
}