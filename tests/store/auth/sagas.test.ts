import axios from 'axios';
import { useRouter } from 'next/router';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../src/config/NOBSCAPI';
import { removeStorageItem } from '../../../src/utils/storageHelpers';
import { authMessage, authMessageClear, authStaffDisplay, authUserDisplay } from '../../../src/store/auth/actions';
import { authStaffLoginSaga, authStaffLogoutSaga, authUserLoginSaga, authUserLogoutSaga, authUserRegisterSaga, authUserVerifySaga } from '../../../src/store/auth/sagas';
import { actionTypes } from '../../../src/store/auth/types';

const router = useRouter();
const { AUTH_STAFF_LOGIN, AUTH_STAFF_LOGOUT, AUTH_USER_LOGIN, AUTH_USER_LOGOUT, AUTH_USER_REGISTER, AUTH_USER_VERIFY } = actionTypes;

describe('authStaffLoginSaga', () => {
  const action = {type: AUTH_STAFF_LOGIN, email: 'person@place.com', password: 'secret'};

  it('should dispatch display', () => {
    const iter = authStaffLoginSaga(action);
    const res =      {data: {message: 'Signed in.', staffname: 'Person'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/auth/login`,
      {staffInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(authStaffDisplay(res.data.staffname)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authStaffLoginSaga(action);
    const res =      {data: {message: 'Oops.', staffname: 'Person'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iter = authStaffLoginSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('authStaffLogoutSaga', () => {
  const action = {type: AUTH_STAFF_LOGOUT};

  it('should dispatch succeeded', () => {
    const iter = authStaffLogoutSaga(action);
    const res =      {data: {message: 'Signed out.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/staff/auth/logout`, {}, {withCredentials: true}));
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authStaffLogoutSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = authStaffLogoutSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserLoginSaga', () => {
  const action = {type: AUTH_USER_LOGIN, email: 'person@place.com', password: 'secret'};

  it('should dispatch display', () => {
    const iter = authUserLoginSaga(action);
    const res =      {data: {message: 'Signed in.', username: 'Person'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/auth/login`,
      {userInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(authUserDisplay(res.data.username)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authUserLoginSaga(action);
    const res =      {data: {message: 'Oops.', username: 'Person'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iter = authUserLoginSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserLogoutSaga', () => {
  const action = {type: AUTH_USER_LOGOUT};

  it('should dispatch succeeded', () => {
    const iter = authUserLogoutSaga(action);
    const res =      {data: {message: 'Signed out.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true}));
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authUserLogoutSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = authUserLogoutSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserRegisterSaga', () => {
  const action = {type: AUTH_USER_REGISTER, email: 'person@place.com', password: 'secret', username: 'Person', router};

  it('should dispatch succeeded, then push history', () => {
    const iter =   authUserRegisterSaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account created.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/register`, {
      userInfo: {email: action.email, password: action.password, username: action.username}
    }));
    expect(iter.next().value).toEqual(delay(2000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(JSON.stringify(iter.next().value)).toEqual(JSON.stringify(call(() => router.push('/verify'))));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authUserRegisterSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = authUserRegisterSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserVerifySaga', () => {
  const action = {type: AUTH_USER_VERIFY, email: 'person@place.com', password: 'secret', confirmationCode: '0123456789', router};

  it('should dispatch succeeded, then push history', () => {
    const iter =   authUserVerifySaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account verified.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/verify`, {
      userInfo: {email: action.email, password: action.password, confirmationCode: action.confirmationCode}
    }));
    expect(iter.next().value).toEqual(delay(2000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(JSON.stringify(iter.next().value)).toEqual(JSON.stringify(call(() => router.push('/login'))));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = authUserVerifySaga(action);
    const res =      {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = authUserVerifySaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(authMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});