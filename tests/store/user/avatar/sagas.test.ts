import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import { submitAvatarSaga } from '../../../../src/store/user/avatar/sagas';
import { actionTypes} from '../../../../src/store/user/avatar/types';

const { SUBMIT_AVATAR } = actionTypes;

const fullAvatar = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyAvatar = new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});

describe('submitAvatarSaga', () => {
  const action = {type: SUBMIT_AVATAR, fullAvatar, tinyAvatar};
  const res1 = {data: {fullSignature: "signedUrlString", tinySignature: "signedUrlString-tiny", fullName: "avatarUrlString"}};

  it('should dispatch succeeded, then reload', () => {
    const iter = submitAvatarSaga(action);
    const res = {data: {message: 'Avatar set.'}};
    const avatarUrl = res1.data.fullName;

    expect(iter.next().value)
      .toEqual(call([axios, axios.post], `${endpoint}/user/get-signed-url/avatar`, {fileType: action.fullAvatar.type}, {withCredentials: true}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.fullSignature, action.fullAvatar, {headers: {'Content-Type': action.fullAvatar.type}}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.tinySignature, action.tinyAvatar, {headers: {'Content-Type': action.tinyAvatar.type}}));

    expect(iter.next(avatarUrl).value)
      .toEqual(call([axios, axios.post], `${endpoint}/user/auth/set-avatar`, {avatar: avatarUrl}, {withCredentials: true}));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(2000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(JSON.stringify(iter.next(res).value)).toEqual(JSON.stringify(call(() => location.reload())));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = submitAvatarSaga(action);
    const res = {data: {message: 'Oops.'}};
    const avatarUrl = res1.data.fullName;

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next(avatarUrl);  //iter.next(res);

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = submitAvatarSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});