import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { removeStorageItem } from '../../utils/storageHelpers';
import { authMessage, authMessageClear, authStaffDisplay, authUserDisplay } from './actions';
import { IAuthUserRegister, IAuthUserVerify, IAuthUserLogin, IAuthUserLogout, IAuthStaffLogin, IAuthStaffLogout } from './types';

export function* authStaffLoginSaga(action: IAuthStaffLogin) {
  try {
    const { data: { message, staffname } } = yield call(
      [axios, axios.post],
      `${endpoint}/staff/auth/login`,
      {staffInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    );

    if (message == 'Signed in.') yield put(authStaffDisplay(staffname));
    else yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(authMessageClear());
}

export function* authStaffLogoutSaga(action: IAuthStaffLogout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/staff/auth/logout`, {}, {withCredentials: true});

    if (message == 'Signed out.') yield call(removeStorageItem, 'appState');
    else {
      yield call(removeStorageItem, 'appState');  // clear their browser anyway
      yield put(authMessage(message));
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(authMessageClear());
}

export function* authUserLoginSaga(action: IAuthUserLogin) {
  try {
    const { data: { message, username } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/auth/login`,
      {userInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    );

    if (message == 'Signed in.') yield put(authUserDisplay(username));
    else yield put(authMessage(message));
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(authMessageClear());
}

export function* authUserLogoutSaga(action: IAuthUserLogout) {
  try {
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true});

    if (message == 'Signed out.') yield call(removeStorageItem, 'appState');
    else {
      yield call(removeStorageItem, 'appState');  // clear their browser anyway
      yield put(authMessage(message));
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(authMessageClear());
}

export function* authUserRegisterSaga(action: IAuthUserRegister) {
  try {
    const { email, password, username, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/register`, {userInfo: {email, password, username}});

    if (message == 'User account created.') {
      yield delay(2000);
      yield put(authMessageClear());
      yield call(() => router.push('/verify'));
    } else {
      yield put(authMessage(message));
      yield delay(4000);
      yield put(authMessageClear());
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
    yield delay(4000);
    yield put(authMessageClear());
  }
}

export function* authUserVerifySaga(action: IAuthUserVerify) {
  try {
    const { email, password, confirmationCode, router } = action;
    const { data: { message } } = yield call([axios, axios.post], `${endpoint}/user/auth/verify`, {userInfo: {email, password, confirmationCode}});
    
    if (message === "User account verified.") {
      yield delay(2000);
      yield put(authMessageClear());
      yield call(() => router.push('/login'));
    } else {
      yield put(authMessage(message));
      yield delay(4000);
      yield put(authMessageClear());
    }
  } catch(err) {
    yield put(authMessage('An error occurred. Please try again.'));
    yield delay(4000);
    yield put(authMessageClear());
  }
}

/*

Facebook OAuth

*/

/*export function* authFacebookCheckStateSaga() {  // before authFacebookLoginSaga
  yield put(authFacebookCheckState());
  window.FB && window.FB.getLoginStatus(
    function(response) {
      //statusChangeCallback(response);
      if (response.status === 'connected') {
        // already logged in, continue to allow access
      } else {
        // not, continue to deny access, so execute authFacebookLoginSaga if trying to FBLogin
      }
    }
  );
}

export function* authFacebookLoginSaga() {
  yield put(authFacebookLogin());
  window.FB && window.FB.login(
    function(response) {
      //loginCallback(response);
      if (response.status === 'connected') {
        // just logged in, allow access
      } else {
        // still not
      }
    },
    {scope: 'email'}
  );
  yield put(authLoginSucceeded());
}

export function* authFacebookLogoutSaga() {
  yield put(authFacebookLogout());
  window.FB && window.FB.logout();
  // just logged out, deny access
  yield put(authLogoutSucceeded());
}*/

/*

Google OAuth

*/

// TO DO: Google OAuth

/*

Twitter OAuth

*/

// TO DO: Twitter OAuth