import { all, takeEvery } from 'redux-saga/effects';

import { userSaveRecipeSaga, userUnsaveRecipeSaga } from '../user/save/sagas';
import { actionTypes } from '../user/save/types';

const { USER_SAVE_RECIPE, USER_UNSAVE_RECIPE } = actionTypes;

export function* watchSave() {
  yield all([
    takeEvery(USER_SAVE_RECIPE, userSaveRecipeSaga),
    takeEvery(USER_UNSAVE_RECIPE, userUnsaveRecipeSaga)
  ]);
}