import {
  requestFriendship,
  acceptFriendship,
  rejectFriendship,
  deleteFriendship,
  blockUser,
  unblockUser
} from '../../../../src/store/user/friendship/actions';
import { actionTypes } from '../../../../src/store/user/friendship/types';

const {
  REQUEST_FRIENDSHIP,
  ACCEPT_FRIENDSHIP,
  REJECT_FRIENDSHIP,
  DELETE_FRIENDSHIP,
  BLOCK_USER,
  UNBLOCK_USER
} = actionTypes;

describe('requestFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(requestFriendship('Juan').type).toEqual(REQUEST_FRIENDSHIP);
  });

  it('returns the correct friend', () => {
    expect(requestFriendship('Juan').friend).toEqual('Juan');
  });
});

describe('acceptFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(acceptFriendship('Juan').type).toEqual(ACCEPT_FRIENDSHIP);
  });

  it('returns the correct friend', () => {
    expect(acceptFriendship('Juan').friend).toEqual('Juan');
  });
});

describe('rejectFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(rejectFriendship('Juan').type).toEqual(REJECT_FRIENDSHIP);
  });

  it('returns the correct friend', () => {
    expect(rejectFriendship('Juan').friend).toEqual('Juan');
  });
});

describe('deleteFriendship action creator', () => {
  it('returns the correct action type', () => {
    expect(deleteFriendship('Juan').type).toEqual(DELETE_FRIENDSHIP);
  });

  it('returns the correct friend', () => {
    expect(deleteFriendship('Juan').friend).toEqual('Juan');
  });
});

describe('blockUser action creator', () => {
  it('returns the correct action type', () => {
    expect(blockUser('Juan').type).toEqual(BLOCK_USER);
  });

  it('returns the correct friend', () => {
    expect(blockUser('Juan').friend).toEqual('Juan');
  });
});

describe('unblockUser action creator', () => {
  it('returns the correct action type', () => {
    expect(unblockUser('Juan').type).toEqual(UNBLOCK_USER);
  });

  it('returns the correct friend', () => {
    expect(unblockUser('Juan').friend).toEqual('Juan');
  });
});