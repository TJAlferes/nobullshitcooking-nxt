import { all, takeEvery } from 'redux-saga/effects';

import {
  staffCreateNewContentSaga,
  staffEditContentSaga,
  staffDeleteContentSaga
} from '../staff/content/sagas';
import { actionTypes as staffContentActionTypes } from '../staff/content/types';
import {
  userCreateNewContentSaga,
  userEditContentSaga,
  userDeleteContentSaga
} from '../user/content/sagas';
import { actionTypes as userContentActionTypes } from '../user/content/types';

const {
  STAFF_CREATE_NEW_CONTENT,
  STAFF_EDIT_CONTENT,
  STAFF_DELETE_CONTENT
} = staffContentActionTypes;
const {
  USER_CREATE_NEW_CONTENT,
  USER_EDIT_CONTENT,
  USER_DELETE_CONTENT
} = userContentActionTypes;

export function* watchContent() {
  yield all([
    takeEvery(STAFF_CREATE_NEW_CONTENT, staffCreateNewContentSaga),
    takeEvery(STAFF_EDIT_CONTENT, staffEditContentSaga),
    takeEvery(STAFF_DELETE_CONTENT, staffDeleteContentSaga),
    takeEvery(USER_CREATE_NEW_CONTENT, userCreateNewContentSaga),
    takeEvery(USER_EDIT_CONTENT, userEditContentSaga),
    takeEvery(USER_DELETE_CONTENT, userDeleteContentSaga)
  ]);
}