import axios from 'axios';
import { useRouter } from 'next/router';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../src/config/NOBSCAPI';
import { removeStorageItem } from '../../../src/utils/storageHelpers';
import { message, messageClear, staffDisplay, userDisplay } from '../../../src/store/auth/actions';
import { staffLoginSaga, staffLogoutSaga, userLoginSaga, userLogoutSaga, userRegisterSaga, userVerifySaga } from '../../../src/store/auth/sagas';
import { actionTypes } from '../../../src/store/auth/types';

const router = useRouter();
const { STAFF_LOGIN, STAFF_LOGOUT, USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_VERIFY } = actionTypes;
const error = 'An error occurred. Please try again.';

describe('staffLoginSaga', () => {
  const action = {type: STAFF_LOGIN, email: 'person@place.com', password: 'secret'};

  it('should dispatch display', () => {
    const iter = staffLoginSaga(action);
    const res =  {data: {message: 'Signed in.', staffname: 'Person'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/auth/login`,
      {staffInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(staffDisplay(res.data.staffname)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = staffLoginSaga(action);
    const res =  {data: {message: 'Oops.', staffname: 'Person'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iter = staffLoginSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('staffLogoutSaga', () => {
  const action = {type: STAFF_LOGOUT};

  it('should dispatch succeeded', () => {
    const iter = staffLogoutSaga(action);
    const res =  {data: {message: 'Signed out.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/staff/auth/logout`, {}, {withCredentials: true}));
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = staffLogoutSaga(action);
    const res =  {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = staffLogoutSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('userLoginSaga', () => {
  const action = {type: USER_LOGIN, email: 'person@place.com', password: 'secret'};

  it('should dispatch display', () => {
    const iter = userLoginSaga(action);
    const res =  {data: {message: 'Signed in.', username: 'Person'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/auth/login`,
      {userInfo: {email: action.email, password: action.password}},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(userDisplay(res.data.username)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = userLoginSaga(action);
    const res =  {data: {message: 'Oops.', username: 'Person'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});    
  });

  it('should dispatch failed if thrown', () => {
    const iter = userLoginSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('userLogoutSaga', () => {
  const action = {type: USER_LOGOUT};

  it('should dispatch succeeded', () => {
    const iter = userLogoutSaga(action);
    const res =  {data: {message: 'Signed out.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/logout`, {}, {withCredentials: true}));
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = userLogoutSaga(action);
    const res =  {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(call(removeStorageItem, 'appState'));
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = userLogoutSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('userRegisterSaga', () => {
  const action = {type: USER_REGISTER, email: 'person@place.com', password: 'secret', username: 'Person', router};

  it('should dispatch succeeded, then push history', () => {
    const iter =       userRegisterSaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account created.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/register`, {
      userInfo: {email: action.email, password: action.password, username: action.username}
    }));
    expect(iter.next().value).toEqual(delay(2000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(JSON.stringify(iter.next().value)).toEqual(JSON.stringify(call(() => router.push('/verify'))));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = userRegisterSaga(action);
    const res =  {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = userRegisterSaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('userVerifySaga', () => {
  const action = {type: USER_VERIFY, email: 'person@place.com', password: 'secret', confirmationCode: '0123456789', router};

  it('should dispatch succeeded, then push history', () => {
    const iter =       userVerifySaga(action);
    const { router } = action;
    const res =        {data: {message: 'User account verified.'}};

    expect(iter.next().value).toEqual(call([axios, axios.post], `${endpoint}/user/auth/verify`, {
      userInfo: {email: action.email, password: action.password, confirmationCode: action.confirmationCode}
    }));
    expect(iter.next().value).toEqual(delay(2000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(JSON.stringify(iter.next().value)).toEqual(JSON.stringify(call(() => router.push('/login'))));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = userVerifySaga(action);
    const res =  {data: {message: 'Oops.'}};

    iter.next();
    expect(iter.next(res).value).toEqual(put(message(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = userVerifySaga(action);

    iter.next();
    expect(iter.throw('error').value).toEqual(put(message(error)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(messageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});