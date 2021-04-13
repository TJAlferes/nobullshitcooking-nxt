import {
  userRequestFriendship,
  userAcceptFriendship,
  userRejectFriendship,
  userDeleteFriendship,
  userBlockUser,
  userUnblockUser
} from '../../../../src/store/user/friendship/actions';
import { actionTypes } from '../../../../src/store/user/friendship/types';

const {
  USER_REQUEST_FRIENDSHIP,
  USER_ACCEPT_FRIENDSHIP,
  USER_REJECT_FRIENDSHIP,
  USER_DELETE_FRIENDSHIP,
  USER_BLOCK_USER,
  USER_UNBLOCK_USER
} = actionTypes;

describe('userRequestFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(userRequestFriendship('Juan').type).toEqual(USER_REQUEST_FRIENDSHIP);
  });

  it('returns the correct friendName', () => {
    expect(userRequestFriendship('Juan').friendName).toEqual('Juan');
  });
});

describe('userAcceptFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(userAcceptFriendship('Juan').type).toEqual(USER_ACCEPT_FRIENDSHIP);
  });

  it('returns the correct friendName', () => {
    expect(userAcceptFriendship('Juan').friendName).toEqual('Juan');
  });
});

describe('userRejectFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(userRejectFriendship('Juan').type).toEqual(USER_REJECT_FRIENDSHIP);
  });

  it('returns the correct friendName', () => {
    expect(userRejectFriendship('Juan').friendName).toEqual('Juan');
  });
});

describe('userDeleteFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeleteFriendship('Juan').type).toEqual(USER_DELETE_FRIENDSHIP);
  });

  it('returns the correct friendName', () => {
    expect(userDeleteFriendship('Juan').friendName).toEqual('Juan');
  });
});

describe('userBlockUser action creator', () => {
  it('returns the correct action type', () => {
    expect(userBlockUser('Juan').type).toEqual(USER_BLOCK_USER);
  });

  it('returns the correct friendName', () => {
    expect(userBlockUser('Juan').friendName).toEqual('Juan');
  });
});

describe('userUnblockUser action creator', () => {
  it('returns the correct action type', () => {
    expect(userUnblockUser('Juan').type).toEqual(USER_UNBLOCK_USER);
  });

  it('returns the correct friendName', () => {
    expect(userUnblockUser('Juan').friendName).toEqual('Juan');
  });
});