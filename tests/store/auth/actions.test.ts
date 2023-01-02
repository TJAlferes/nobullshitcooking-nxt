import { useRouter } from 'next/router';

import { authUpdateLocalAvatar, authStaffDisplay, authStaffLogin, authUserDisplay, authUserLogin, authUserRegister, authUserVerify } from '../../../src/store/auth/actions';
import { actionTypes } from '../../../src/store/auth/types';

const { AUTH_UPDATE_LOCAL_AVATAR, AUTH_STAFF_DISPLAY, AUTH_STAFF_LOGIN, AUTH_USER_DISPLAY, AUTH_USER_LOGIN, AUTH_USER_REGISTER, AUTH_USER_VERIFY } = actionTypes;

const email =    'coolperson@coolplace.com';
const password = 'supersecret';
const router =   useRouter();

describe('authUpdateLocalAvatar action creator', () => {
  const avatar = 'Leeroy';
  const creator = authUpdateLocalAvatar(avatar);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_UPDATE_LOCAL_AVATAR);
  });

  it('returns the correct avatar', () => {
    expect(creator.avatar).toEqual(avatar);
  });
});

describe('authStaffDisplay action creator', () => {
  const authname = 'Allison';
  const creator = authStaffDisplay(authname);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_STAFF_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(creator.authname).toEqual(authname);
  });
});

describe('authStaffLogin action creator', () => {
  const creator = authStaffLogin(email, password);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_STAFF_LOGIN);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });
});

describe('authUserDisplay action creator', () => {
  const authname = 'Allison';
  const creator = authUserDisplay(authname);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_USER_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(creator.authname).toEqual(authname);
  });
});

describe('authUserLogin action creator', () => {
  const creator = authUserLogin(email, password);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_USER_LOGIN);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });
});

describe('authUserRegister action creator', () => {
  const username = 'CoolPerson';
  const creator = authUserRegister(email, password, username, router);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_USER_REGISTER);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });

  it('returns the correct username', () => {
    expect(creator.username).toEqual(username);
  });
});

describe('authUserVerify action creator', () => {
  const confirmationCode = 'SOMERANDOMCODE';
  const creator = authUserVerify(email, password, confirmationCode, router);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(AUTH_USER_VERIFY);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });

  it('returns the correct confirmationCode', () => {
    expect(creator.confirmationCode).toEqual(confirmationCode);
  });
});