import { all, takeEvery } from 'redux-saga/effects';

import { submitAvatarSaga } from '../user/avatar/sagas';
import { actionTypes } from '../user/avatar/types';

const { SUBMIT_AVATAR } = actionTypes;

export function* watchAvatar() {
  yield all([takeEvery(SUBMIT_AVATAR, submitAvatarSaga)]);
}