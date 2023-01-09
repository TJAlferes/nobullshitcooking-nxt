import { all, takeEvery } from 'redux-saga/effects';

import { createNewIngredientSaga, editIngredientSaga, deleteIngredientSaga } from '../staff/ingredient/sagas';
import { actionTypes as staffIngredientActionTypes } from '../staff/ingredient/types';
import { createNewPrivateIngredientSaga, editPrivateIngredientSaga, deletePrivateIngredientSaga } from '../user/ingredient/sagas';
import { actionTypes as userIngredientActionTypes } from '../user/ingredient/types';

const { CREATE_NEW_INGREDIENT, EDIT_INGREDIENT, DELETE_INGREDIENT } = staffIngredientActionTypes;
const { CREATE_NEW_PRIVATE_INGREDIENT, EDIT_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = userIngredientActionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(CREATE_NEW_INGREDIENT, createNewIngredientSaga),
    takeEvery(EDIT_INGREDIENT,       editIngredientSaga),
    takeEvery(DELETE_INGREDIENT,     deleteIngredientSaga),

    takeEvery(CREATE_NEW_PRIVATE_INGREDIENT, createNewPrivateIngredientSaga),
    takeEvery(EDIT_PRIVATE_INGREDIENT,       editPrivateIngredientSaga),
    takeEvery(DELETE_PRIVATE_INGREDIENT,     deletePrivateIngredientSaga)
  ]);
}