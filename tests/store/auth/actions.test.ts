import { useRouter } from 'next/router';

import {
  authUpdateLocalAvatar,
  authStaffDisplay,
  authStaffLogin,
  authUserDisplay,
  authUserLogin,
  authUserRegister,
  authUserVerify
} from '../../../src/store/auth/actions';
import { actionTypes } from '../../../src/store/auth/types';

const router = useRouter();
const {
  AUTH_UPDATE_LOCAL_AVATAR,
  AUTH_STAFF_DISPLAY,
  AUTH_STAFF_LOGIN,
  AUTH_USER_DISPLAY,
  AUTH_USER_LOGIN,
  AUTH_USER_REGISTER,
  AUTH_USER_VERIFY
} = actionTypes;

describe('authUpdateLocalAvatar action creator', () => {
  it('returns the correct action type', () => {
    expect(authUpdateLocalAvatar('Leeroy').type)
      .toEqual(AUTH_UPDATE_LOCAL_AVATAR);
  });

  it('returns the correct avatar', () => {
    expect(authUpdateLocalAvatar('Leeroy').avatar).toEqual('Leeroy');
  });
});

describe('authStaffDisplay action creator', () => {
  it('returns the correct action type', () => {
    expect(authStaffDisplay('Allison').type)
      .toEqual(AUTH_STAFF_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(authStaffDisplay('Allison').authname).toEqual('Allison');
  });
});

describe('authStaffLogin action creator', () => {
  it('returns the correct action type', () => {
    expect(authStaffLogin('coolperson@coolplace.com', 'supersecret').type)
      .toEqual(AUTH_STAFF_LOGIN);
  });

  it('returns the correct email', () => {
    expect(authStaffLogin('coolperson@coolplace.com', 'supersecret').email)
      .toEqual('coolperson@coolplace.com');
  });

  it('returns the correct password', () => {
    expect(authStaffLogin('coolperson@coolplace.com', 'supersecret').password)
      .toEqual('supersecret');
  });
});

describe('authUserDisplay action creator', () => {
  it('returns the correct action type', () => {
    expect(authUserDisplay('Allison').type)
      .toEqual(AUTH_USER_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(authUserDisplay('Allison').authname).toEqual('Allison');
  });
});

describe('authUserLogin action creator', () => {
  it('returns the correct action type', () => {
    expect(authUserLogin('coolperson@coolplace.com', 'supersecret').type)
      .toEqual(AUTH_USER_LOGIN);
  });

  it('returns the correct email', () => {
    expect(authUserLogin('coolperson@coolplace.com', 'supersecret').email)
      .toEqual('coolperson@coolplace.com');
  });

  it('returns the correct password', () => {
    expect(authUserLogin('coolperson@coolplace.com', 'supersecret').password)
      .toEqual('supersecret');
  });
});

describe('authUserRegister action creator', () => {
  it('returns the correct action type', () => {
    expect(authUserRegister(
      'coolperson@coolplace.com',
      'supersecret',
      'CoolPerson',
      router
    ).type).toEqual(AUTH_USER_REGISTER);
  });

  it('returns the correct email', () => {
    expect(authUserRegister(
      'coolperson@coolplace.com',
      'supersecret',
      'CoolPerson',
      router
    ).email).toEqual('coolperson@coolplace.com');
  });

  it('returns the correct password', () => {
    expect(authUserRegister(
      'coolperson@coolplace.com',
      'supersecret',
      'CoolPerson',
      router
    ).password).toEqual('supersecret');
  });

  it('returns the correct username', () => {
    expect(authUserRegister(
      'coolperson@coolplace.com',
      'supersecret',
      'CoolPerson',
      router
    ).username).toEqual('CoolPerson');
  });
});

describe('authUserVerify action creator', () => {
  it('returns the correct action type', () => {
    expect(authUserVerify(
      'coolperson@coolplace.com',
      'supersecret',
      'SOMERANDOMCODE',
      router
    ).type).toEqual(AUTH_USER_VERIFY);
  });

  it('returns the correct email', () => {
    expect(authUserVerify(
      'coolperson@coolplace.com',
      'supersecret',
      'SOMERANDOMCODE',
      router
    ).email).toEqual('coolperson@coolplace.com');
  });

  it('returns the correct password', () => {
    expect(authUserVerify(
      'coolperson@coolplace.com',
      'supersecret',
      'SOMERANDOMCODE',
      router
    ).password).toEqual('supersecret');
  });

  it('returns the correct confirmationCode', () => {
    expect(authUserVerify(
      'coolperson@coolplace.com',
      'supersecret',
      'SOMERANDOMCODE',
      router
    ).confirmationCode).toEqual('SOMERANDOMCODE');
  });
});