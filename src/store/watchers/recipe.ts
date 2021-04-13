import { all, takeEvery } from 'redux-saga/effects';

import {
  staffCreateNewRecipeSaga,
  staffEditRecipeSaga,
  staffDeleteRecipeSaga
} from '../staff/recipe/sagas';
import { actionTypes as staffRecipeActionTypes } from '../staff/recipe/types';
import {
  userCreateNewRecipeSaga,
  userDeletePrivateRecipeSaga,
  userDisownPublicRecipeSaga,
  userEditRecipeSaga
} from '../user/recipe/sagas';
import { actionTypes as userRecipeActionTypes } from '../user/recipe/types';

const {
  STAFF_CREATE_NEW_RECIPE,
  STAFF_EDIT_RECIPE,
  STAFF_DELETE_RECIPE
} = staffRecipeActionTypes;
const {
  USER_CREATE_NEW_PRIVATE_RECIPE,
  USER_EDIT_PRIVATE_RECIPE,
  USER_DELETE_PRIVATE_RECIPE,
  USER_CREATE_NEW_PUBLIC_RECIPE,
  USER_EDIT_PUBLIC_RECIPE,
  USER_DISOWN_PUBLIC_RECIPE
} = userRecipeActionTypes;

export function* watchRecipe() {
  yield all([
    takeEvery(STAFF_CREATE_NEW_RECIPE, staffCreateNewRecipeSaga),
    takeEvery(STAFF_EDIT_RECIPE, staffEditRecipeSaga),
    takeEvery(STAFF_DELETE_RECIPE, staffDeleteRecipeSaga),
    takeEvery(USER_CREATE_NEW_PRIVATE_RECIPE, userCreateNewRecipeSaga),
    takeEvery(USER_EDIT_PRIVATE_RECIPE, userEditRecipeSaga),
    takeEvery(USER_DELETE_PRIVATE_RECIPE, userDeletePrivateRecipeSaga),
    takeEvery(USER_CREATE_NEW_PUBLIC_RECIPE, userCreateNewRecipeSaga),
    takeEvery(USER_EDIT_PUBLIC_RECIPE, userEditRecipeSaga),
    takeEvery(USER_DISOWN_PUBLIC_RECIPE, userDisownPublicRecipeSaga)
  ]);
}