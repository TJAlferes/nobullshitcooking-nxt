import { actionTypes } from './types';

const {
  USER_REQUEST_FRIENDSHIP,
  USER_ACCEPT_FRIENDSHIP,
  USER_REJECT_FRIENDSHIP,
  USER_DELETE_FRIENDSHIP,
  USER_BLOCK_USER,
  USER_UNBLOCK_USER
} = actionTypes;

export const userRequestFriendship = (friendName: string) => ({
  type: USER_REQUEST_FRIENDSHIP,
  friendName
});

export const userAcceptFriendship = (friendName: string) => ({
  type: USER_ACCEPT_FRIENDSHIP,
  friendName
});

export const userRejectFriendship = (friendName: string) => ({
  type: USER_REJECT_FRIENDSHIP,
  friendName
});

export const userDeleteFriendship = (friendName: string) => ({
  type: USER_DELETE_FRIENDSHIP,
  friendName
});

export const userBlockUser = (friendName: string) => ({
  type: USER_BLOCK_USER,
  friendName
});

export const userUnblockUser = (friendName: string) => ({
  type: USER_UNBLOCK_USER,
  friendName
});