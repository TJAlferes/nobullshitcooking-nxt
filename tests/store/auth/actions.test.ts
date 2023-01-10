import { useRouter } from 'next/router';

import { updateLocalAvatar, staffDisplay, staffLogin, userDisplay, userLogin, userRegister, userVerify } from '../../../src/store/auth/actions';
import { actionTypes } from '../../../src/store/auth/types';

const { UPDATE_LOCAL_AVATAR, STAFF_DISPLAY, STAFF_LOGIN, USER_DISPLAY, USER_LOGIN, USER_REGISTER, USER_VERIFY } = actionTypes;

const email =    'coolperson@coolplace.com';
const password = 'supersecret';
const router =   useRouter();

describe('updateLocalAvatar action creator', () => {
  const avatar = 'Leeroy';
  const creator = updateLocalAvatar(avatar);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(UPDATE_LOCAL_AVATAR);
  });

  it('returns the correct avatar', () => {
    expect(creator.avatar).toEqual(avatar);
  });
});

describe('staffDisplay action creator', () => {
  const authname = 'Allison';
  const creator = staffDisplay(authname);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(STAFF_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(creator.authname).toEqual(authname);
  });
});

describe('staffLogin action creator', () => {
  const creator = staffLogin(email, password);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(STAFF_LOGIN);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });
});

describe('userDisplay action creator', () => {
  const authname = 'Allison';
  const creator = userDisplay(authname);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(USER_DISPLAY);
  });

  it('returns the correct authname', () => {
    expect(creator.authname).toEqual(authname);
  });
});

describe('userLogin action creator', () => {
  const creator = userLogin(email, password);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(USER_LOGIN);
  });

  it('returns the correct email', () => {
    expect(creator.email).toEqual(email);
  });

  it('returns the correct password', () => {
    expect(creator.password).toEqual(password);
  });
});

describe('userRegister action creator', () => {
  const username = 'CoolPerson';
  const creator = userRegister(email, password, username, router);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(USER_REGISTER);
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

describe('userVerify action creator', () => {
  const confirmationCode = 'SOMERANDOMCODE';
  const creator = userVerify(email, password, confirmationCode, router);

  it('returns the correct action type', () => {
    expect(creator.type).toEqual(USER_VERIFY);
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