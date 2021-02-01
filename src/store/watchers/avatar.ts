import { all, takeEvery } from 'redux-saga/effects';

import { userSubmitAvatarSaga } from '../user/avatar/sagas';
import { actionTypes } from '../user/avatar/types';

const { USER_SUBMIT_AVATAR } = actionTypes;

export function* watchAvatar() {
  yield all([takeEvery(USER_SUBMIT_AVATAR, userSubmitAvatarSaga)]);
}