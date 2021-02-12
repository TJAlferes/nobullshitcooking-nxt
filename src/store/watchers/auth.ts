import { all, takeEvery } from 'redux-saga/effects';

import {
  authUserLoginSaga,
  authUserLogoutSaga,

  authUserRegisterSaga,
  authUserVerifySaga,
  authStaffLoginSaga,
  authStaffLogoutSaga
} from '../auth/sagas';
import { actionTypes } from '../auth/types';

const {
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,

  AUTH_USER_REGISTER,
  AUTH_USER_VERIFY,
  AUTH_STAFF_LOGIN,
  AUTH_STAFF_LOGOUT
} = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_STAFF_LOGIN, authStaffLoginSaga),
    takeEvery(AUTH_STAFF_LOGOUT, authStaffLogoutSaga),

    takeEvery(AUTH_USER_REGISTER, authUserRegisterSaga),
    takeEvery(AUTH_USER_VERIFY, authUserVerifySaga),
    takeEvery(AUTH_USER_LOGIN, authUserLoginSaga),
    takeEvery(AUTH_USER_LOGOUT, authUserLogoutSaga)
  ]);
}