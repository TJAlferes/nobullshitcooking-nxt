import { all, takeEvery } from 'redux-saga/effects';

import {
  staffCreateNewIngredientSaga,
  staffEditIngredientSaga,
  staffDeleteIngredientSaga
} from '../staff/ingredient/sagas';
import {
  actionTypes as staffIngredientActionTypes
} from '../staff/ingredient/types';
import {
  userCreateNewPrivateIngredientSaga,
  userEditPrivateIngredientSaga,
  userDeletePrivateIngredientSaga
} from '../user/ingredient/sagas';
import {
  actionTypes as userIngredientActionTypes
} from '../user/ingredient/types';

const {
  STAFF_CREATE_NEW_INGREDIENT,
  STAFF_EDIT_INGREDIENT,
  STAFF_DELETE_INGREDIENT
} = staffIngredientActionTypes;
const {
  USER_CREATE_NEW_PRIVATE_INGREDIENT,
  USER_EDIT_PRIVATE_INGREDIENT,
  USER_DELETE_PRIVATE_INGREDIENT
} = userIngredientActionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(STAFF_CREATE_NEW_INGREDIENT, staffCreateNewIngredientSaga),
    takeEvery(STAFF_EDIT_INGREDIENT, staffEditIngredientSaga),
    takeEvery(STAFF_DELETE_INGREDIENT, staffDeleteIngredientSaga),
    takeEvery(USER_CREATE_NEW_PRIVATE_INGREDIENT, userCreateNewPrivateIngredientSaga),
    takeEvery(USER_EDIT_PRIVATE_INGREDIENT, userEditPrivateIngredientSaga),
    takeEvery(USER_DELETE_PRIVATE_INGREDIENT, userDeletePrivateIngredientSaga)
  ]);
}