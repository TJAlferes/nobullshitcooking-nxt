import { all, takeEvery } from 'redux-saga/effects';

import {
  dataGetIngredientsSaga,
  dataGetMyPrivateIngredientsSaga
} from '../data/sagas';
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
  STAFF_CREATE_NEW_INGREDIENT_SUCCEEDED,
  STAFF_EDIT_INGREDIENT,
  STAFF_EDIT_INGREDIENT_SUCCEEDED,
  STAFF_DELETE_INGREDIENT,
  STAFF_DELETE_INGREDIENT_SUCCEEDED
} = staffIngredientActionTypes;
const {
  USER_CREATE_NEW_PRIVATE_INGREDIENT,
  USER_CREATE_NEW_PRIVATE_INGREDIENT_SUCCEEDED,
  USER_EDIT_PRIVATE_INGREDIENT,
  USER_EDIT_PRIVATE_INGREDIENT_SUCCEEDED,
  USER_DELETE_PRIVATE_INGREDIENT,
  USER_DELETE_PRIVATE_INGREDIENT_SUCCEEDED
} = userIngredientActionTypes;

export function* watchIngredient() {
  yield all([
    takeEvery(STAFF_CREATE_NEW_INGREDIENT, staffCreateNewIngredientSaga),
    takeEvery(STAFF_CREATE_NEW_INGREDIENT_SUCCEEDED, dataGetIngredientsSaga),

    takeEvery(STAFF_EDIT_INGREDIENT, staffEditIngredientSaga),
    takeEvery(STAFF_EDIT_INGREDIENT_SUCCEEDED, dataGetIngredientsSaga),

    takeEvery(STAFF_DELETE_INGREDIENT, staffDeleteIngredientSaga),
    takeEvery(STAFF_DELETE_INGREDIENT_SUCCEEDED, dataGetIngredientsSaga),

    takeEvery(USER_CREATE_NEW_PRIVATE_INGREDIENT, userCreateNewPrivateIngredientSaga),
    takeEvery(USER_CREATE_NEW_PRIVATE_INGREDIENT_SUCCEEDED, dataGetMyPrivateIngredientsSaga),

    takeEvery(USER_EDIT_PRIVATE_INGREDIENT, userEditPrivateIngredientSaga),
    takeEvery(USER_EDIT_PRIVATE_INGREDIENT_SUCCEEDED, dataGetMyPrivateIngredientsSaga),
    
    takeEvery(USER_DELETE_PRIVATE_INGREDIENT, userDeletePrivateIngredientSaga),
    takeEvery(USER_DELETE_PRIVATE_INGREDIENT_SUCCEEDED, dataGetMyPrivateIngredientsSaga)
  ]);
}