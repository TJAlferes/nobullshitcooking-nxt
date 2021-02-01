export const actionTypes = {
  USER_REQUEST_FRIENDSHIP: 'USER_REQUEST_FRIENDSHIP',
  USER_REQUEST_FRIENDSHIP_SUCCEEDED: 'USER_REQUEST_FRIENDSHIP_SUCCEEDED',
  USER_REQUEST_FRIENDSHIP_FAILED: 'USER_REQUEST_FRIENDSHIP_FAILED',
  USER_ACCEPT_FRIENDSHIP: 'USER_ACCEPT_FRIENDSHIP',
  USER_ACCEPT_FRIENDSHIP_SUCCEEDED: 'USER_ACCEPT_FRIENDSHIP_SUCCEEDED',
  USER_ACCEPT_FRIENDSHIP_FAILED: 'USER_ACCEPT_FRIENDSHIP_FAILED',
  USER_REJECT_FRIENDSHIP: 'USER_REJECT_FRIENDSHIP',
  USER_REJECT_FRIENDSHIP_SUCCEEDED: 'USER_REJECT_FRIENDSHIP_SUCCEEDED',
  USER_REJECT_FRIENDSHIP_FAILED: 'USER_REJECT_FRIENDSHIP_FAILED',
  USER_DELETE_FRIENDSHIP: 'USER_DELETE_FRIENDSHIP',
  USER_DELETE_FRIENDSHIP_SUCCEEDED: 'USER_DELETE_FRIENDSHIP_SUCCEEDED',
  USER_DELETE_FRIENDSHIP_FAILED: 'USER_DELETE_FRIENDSHIP_FAILED',
  USER_BLOCK_USER: 'USER_BLOCK_USER',
  USER_BLOCK_USER_SUCCEEDED: 'USER_BLOCK_USER_SUCCEEDED',
  USER_BLOCK_USER_FAILED: 'USER_BLOCK_USER_FAILED',
  USER_UNBLOCK_USER: 'USER_UNBLOCK_USER',
  USER_UNBLOCK_USER_SUCCEEDED: 'USER_UNBLOCK_USER_SUCCEEDED',
  USER_UNBLOCK_USER_FAILED: 'USER_UNBLOCK_USER_FAILED'
} as const;

export interface IUserRequestFriendship {
  type: typeof actionTypes.USER_REQUEST_FRIENDSHIP;
  friendName: string;
}

export interface IUserRequestFriendshipSucceeded {
  type: typeof actionTypes.USER_REQUEST_FRIENDSHIP_SUCCEEDED;
  message: string;
}

export interface IUserRequestFriendshipFailed {
  type: typeof actionTypes.USER_REQUEST_FRIENDSHIP_FAILED;
  message: string;
}

export interface IUserAcceptFriendship {
  type: typeof actionTypes.USER_ACCEPT_FRIENDSHIP;
  friendName: string;
}

export interface IUserAcceptFriendshipSucceeded {
  type: typeof actionTypes.USER_ACCEPT_FRIENDSHIP_SUCCEEDED;
  message: string;
}

export interface IUserAcceptFriendshipFailed {
  type: typeof actionTypes.USER_ACCEPT_FRIENDSHIP_FAILED;
  message: string;
}

export interface IUserRejectFriendship {
  type: typeof actionTypes.USER_REJECT_FRIENDSHIP;
  friendName: string;
}

export interface IUserRejectFriendshipSucceeded {
  type: typeof actionTypes.USER_REJECT_FRIENDSHIP_SUCCEEDED;
  message: string;
}

export interface IUserRejectFriendshipFailed {
  type: typeof actionTypes.USER_REJECT_FRIENDSHIP_FAILED;
  message: string;
}

export interface IUserDeleteFriendship {
  type: typeof actionTypes.USER_DELETE_FRIENDSHIP;
  friendName: string;
}

export interface IUserDeleteFriendshipSucceeded {
  type: typeof actionTypes.USER_DELETE_FRIENDSHIP_SUCCEEDED;
  message: string;
}

export interface IUserDeleteFriendshipFailed {
  type: typeof actionTypes.USER_DELETE_FRIENDSHIP_FAILED;
  message: string;
}

export interface IUserBlockUser {
  type: typeof actionTypes.USER_BLOCK_USER;
  friendName: string;
}

export interface IUserBlockUserSucceeded {
  type: typeof actionTypes.USER_BLOCK_USER_SUCCEEDED;
  message: string;
}

export interface IUserBlockUserFailed {
  type: typeof actionTypes.USER_BLOCK_USER_FAILED;
  message: string;
}

export interface IUserUnblockUser {
  type: typeof actionTypes.USER_UNBLOCK_USER;
  friendName: string;
}

export interface IUserUnblockUserSucceeded {
  type: typeof actionTypes.USER_UNBLOCK_USER_SUCCEEDED;
  message: string;
}

export interface IUserUnblockUserFailed {
  type: typeof actionTypes.USER_UNBLOCK_USER_FAILED;
  message: string;
}