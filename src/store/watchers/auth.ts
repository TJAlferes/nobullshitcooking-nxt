import { all, takeEvery } from 'redux-saga/effects';

import {
  authStaffLoginSaga,
  authStaffLogoutSaga,
  authUserRegisterSaga,
  authUserVerifySaga,
  authUserLoginSaga,
  authUserLogoutSaga
} from '../auth/sagas';
import { actionTypes } from '../auth/types';

const {
  AUTH_STAFF_LOGIN,
  AUTH_STAFF_LOGOUT,
  AUTH_USER_REGISTER,
  AUTH_USER_VERIFY,
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT
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