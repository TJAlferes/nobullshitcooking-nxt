import { all, takeEvery } from 'redux-saga/effects';

import { staffLoginSaga, staffLogoutSaga, userRegisterSaga, userVerifySaga, userLoginSaga, userLogoutSaga } from '../auth/sagas';
import { actionTypes } from '../auth/types';

const { STAFF_LOGIN, STAFF_LOGOUT, USER_REGISTER, USER_VERIFY, USER_LOGIN, USER_LOGOUT } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(STAFF_LOGIN,  staffLoginSaga),
    takeEvery(STAFF_LOGOUT, staffLogoutSaga),

    takeEvery(USER_REGISTER, userRegisterSaga),
    takeEvery(USER_VERIFY,   userVerifySaga),

    takeEvery(USER_LOGIN,    userLoginSaga),
    takeEvery(USER_LOGOUT,   userLogoutSaga)
  ]);
}