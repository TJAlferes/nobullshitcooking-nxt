import { all, takeEvery } from 'redux-saga/effects';

import { saveRecipeSaga, unsaveRecipeSaga } from '../user/save/sagas';
import { actionTypes } from '../user/save/types';

const { SAVE_RECIPE, UNSAVE_RECIPE } = actionTypes;

export function* watchSave() {
  yield all([
    takeEvery(SAVE_RECIPE,   saveRecipeSaga),
    takeEvery(UNSAVE_RECIPE, unsaveRecipeSaga)
  ]);
}