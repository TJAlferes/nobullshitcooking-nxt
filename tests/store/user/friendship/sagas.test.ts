import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import {
  requestFriendshipSaga,
  acceptFriendshipSaga,
  rejectFriendshipSaga,
  deleteFriendshipSaga,
  blockUserSaga,
  unblockUserSaga
} from '../../../../src/store/user/friendship/sagas';
import { actionTypes } from '../../../../src/store/user/friendship/types';

const {
  REQUEST_FRIENDSHIP,
  ACCEPT_FRIENDSHIP,
  REJECT_FRIENDSHIP,
  DELETE_FRIENDSHIP,
  BLOCK_USER,
  UNBLOCK_USER
} = actionTypes;

describe('requestFriendshipSaga', () => {
  const action = {type: REQUEST_FRIENDSHIP, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = requestFriendshipSaga(action);
    const res = {data: {message: 'Friendship request sent.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/friendship/create`,
      {friend: action.friend},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = requestFriendshipSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = requestFriendshipSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('acceptFriendshipSaga', () => {
  const action = {type: ACCEPT_FRIENDSHIP, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = acceptFriendshipSaga(action);
    const res = {data: {message: 'Friendship request accepted.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/user/friendship/accept`,
      {friend: action.friend},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = acceptFriendshipSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = acceptFriendshipSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('rejectFriendshipSaga', () => {
  const action = {type: REJECT_FRIENDSHIP, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = rejectFriendshipSaga(action);
    const res = {data: {message: 'Friendship request rejected.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/user/friendship/reject`,
      {friend: action.friend},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = rejectFriendshipSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = rejectFriendshipSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('deleteFriendshipSaga', () => {
  const action = {type: DELETE_FRIENDSHIP, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = deleteFriendshipSaga(action);
    const res = {data: {message: 'No longer friends. Maybe again later.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/delete`,
      {withCredentials: true, data: {friend: action.friend}}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = deleteFriendshipSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = deleteFriendshipSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('blockUserSaga', () => {
  const action = {type: BLOCK_USER, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = blockUserSaga(action);
    const res = {data: {message: 'User blocked.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/friendship/block`,
      {friend: action.friend},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = blockUserSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = blockUserSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('unblockUserSaga', () => {
  const action = {type: UNBLOCK_USER, friend: "Allison"};

  it ('should dispatch succeeded', () => {
    const iter = unblockUserSaga(action);
    const res = {data: {message: 'User unblocked.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.delete],
      `${endpoint}/user/friendship/unblock`,
      {withCredentials: true, data: {friend: action.friend}}
    ));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(3000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed', () => {
    const iter = unblockUserSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it ('should dispatch failed if thrown', () => {
    const iter = unblockUserSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});