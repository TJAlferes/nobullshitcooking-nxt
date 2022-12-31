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
    const iterator = authStaffLoginSaga(action);
    const res =      {data: {message: 'Signed in.', staffname: 'Person'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/staff/auth/login`, {staffInfo: {email: action.email, password: action.password}}, {withCredentials: true}));
    expect(iterator.next(res).value).toEqual(put(authStaffDisplay(res.data.staffname)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authStaffLoginSaga(action);
    const res =      {data: {message: 'Oops.', staffname: 'Person'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authStaffLoginSaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('authStaffLogoutSaga', () => {
  const action = {type: AUTH_STAFF_LOGOUT};

  it('should dispatch succeeded', () => {
    const iterator = authStaffLogoutSaga(action);
    const res =      {data: {message: 'Signed out.'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/staff/auth/logout`, {}, {withCredentials: true}));
    expect(iterator.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authStaffLogoutSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authStaffLogoutSaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserLoginSaga', () => {
  const action = {type: AUTH_USER_LOGIN, email: 'person@place.com', password: 'secret'};

  it('should dispatch display', () => {
    const iterator = authUserLoginSaga(action);
    const res =      {data: {message: 'Signed in.', username: 'Person'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/login`, {userInfo: {email: action.email, password: action.password}}, {withCredentials: true}));
    expect(iterator.next(res).value).toEqual(put(authUserDisplay(res.data.username)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authUserLoginSaga(action);
    const res =      {data: {message: 'Oops.', username: 'Person'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authUserLoginSaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserLogoutSaga', () => {
  const action = {type: AUTH_USER_LOGOUT};

  it('should dispatch succeeded', () => {
    const iterator = authUserLogoutSaga(action);
    const res =      {data: {message: 'Signed out.'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true}));
    expect(iterator.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authUserLogoutSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authUserLogoutSaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserRegisterSaga', () => {
  const action = {type: AUTH_USER_REGISTER, email: 'person@place.com', password: 'secret', username: 'Person', router};

  it('should dispatch succeeded, then push history', () => {
    const iterator =   authUserRegisterSaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account created.'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/register`, {
      userInfo: {email: action.email, password: action.password, username: action.username}
    }));
    expect(iterator.next().value).toEqual(delay(2000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(() => router.push('/verify'))));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authUserRegisterSaga(action);
    const res =      {data: {message: 'Oops.'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authUserRegisterSaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('authUserVerifySaga', () => {
  const action = {type: AUTH_USER_VERIFY, email: 'person@place.com', password: 'secret', confirmationCode: '0123456789', router};

  it('should dispatch succeeded, then push history', () => {
    const iterator =   authUserVerifySaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account verified.'}};

    expect(iterator.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/verify`, {
      userInfo: {email: action.email, password: action.password, confirmationCode: action.confirmationCode}
    }));
    expect(iterator.next().value).toEqual(delay(2000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(() => router.push('/login'))));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = authUserVerifySaga(action);
    const res =      {data: {message: 'Oops.'}};

    iterator.next();
    expect(iterator.next(res).value).toEqual(put(authMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = authUserVerifySaga(action);

    iterator.next();
    expect(iterator.throw('error').value).toEqual(put(authMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(authMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});