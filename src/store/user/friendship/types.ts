export const actionTypes = {
  USER_REQUEST_FRIENDSHIP: 'USER_REQUEST_FRIENDSHIP',
  USER_ACCEPT_FRIENDSHIP: 'USER_ACCEPT_FRIENDSHIP',
  USER_REJECT_FRIENDSHIP: 'USER_REJECT_FRIENDSHIP',
  USER_DELETE_FRIENDSHIP: 'USER_DELETE_FRIENDSHIP',
  USER_BLOCK_USER: 'USER_BLOCK_USER',
  USER_UNBLOCK_USER: 'USER_UNBLOCK_USER'
} as const;

export interface IUserRequestFriendship {
  type: typeof actionTypes.USER_REQUEST_FRIENDSHIP;
  friendName: string;
}

export interface IUserAcceptFriendship {
  type: typeof actionTypes.USER_ACCEPT_FRIENDSHIP;
  friendName: string;
}

export interface IUserRejectFriendship {
  type: typeof actionTypes.USER_REJECT_FRIENDSHIP;
  friendName: string;
}

export interface IUserDeleteFriendship {
  type: typeof actionTypes.USER_DELETE_FRIENDSHIP;
  friendName: string;
}

export interface IUserBlockUser {
  type: typeof actionTypes.USER_BLOCK_USER;
  friendName: string;
}

export interface IUserUnblockUser {
  type: typeof actionTypes.USER_UNBLOCK_USER;
  friendName: string;
}