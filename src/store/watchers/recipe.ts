import { all, takeEvery } from 'redux-saga/effects';

import { createNewRecipeSaga, deletePrivateRecipeSaga, disownPublicRecipeSaga, editRecipeSaga } from '../user/recipe/sagas';
import { actionTypes as userRecipeActionTypes } from '../user/recipe/types';

const {
  CREATE_NEW_PRIVATE_RECIPE, EDIT_PRIVATE_RECIPE, DELETE_PRIVATE_RECIPE,
  CREATE_NEW_PUBLIC_RECIPE, EDIT_PUBLIC_RECIPE, DISOWN_PUBLIC_RECIPE
} = userRecipeActionTypes;

export function* watchRecipe() {
  yield all([
    takeEvery(CREATE_NEW_PRIVATE_RECIPE, createNewRecipeSaga),
    takeEvery(EDIT_PRIVATE_RECIPE,       editRecipeSaga),
    takeEvery(DELETE_PRIVATE_RECIPE,     deletePrivateRecipeSaga),

    takeEvery(CREATE_NEW_PUBLIC_RECIPE, createNewRecipeSaga),
    takeEvery(EDIT_PUBLIC_RECIPE,       editRecipeSaga),
    takeEvery(DISOWN_PUBLIC_RECIPE,     disownPublicRecipeSaga)
  ]);
}