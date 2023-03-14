import { all, takeEvery } from 'redux-saga/effects';

import { userRegisterSaga, userVerifySaga, userLoginSaga, userLogoutSaga } from '../auth/sagas';
import { actionTypes }                                                     from '../auth/types';

const { USER_REGISTER, USER_VERIFY, USER_LOGIN, USER_LOGOUT } = actionTypes;

export function* watchAuth() {
  yield all([
    takeEvery(USER_REGISTER, userRegisterSaga),
    takeEvery(USER_VERIFY,   userVerifySaga),

    takeEvery(USER_LOGIN,    userLoginSaga),
    takeEvery(USER_LOGOUT,   userLogoutSaga)
  ]);
}
