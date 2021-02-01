export const actionTypes = {
  USER_SUBMIT_AVATAR: 'USER_SUBMIT_AVATAR',
  USER_SUBMIT_AVATAR_SUCCEEDED: 'USER_SUBMIT_AVATAR_SUCCEEDED',
  USER_SUBMIT_AVATAR_FAILED: 'USER_SUBMIT_AVATAR_FAILED'
} as const;

export interface IUserSubmitAvatar {
  type: typeof actionTypes.USER_SUBMIT_AVATAR;
  fullAvatar: File | null;  // rename to avatarFull ?
  tinyAvatar: File | null;  // rename to avatarTiny ?
}

export interface IUserSubmitAvatarSucceeded {
  type: typeof actionTypes.USER_SUBMIT_AVATAR_SUCCEEDED;
  message: string;
}

export interface IUserSubmitAvatarFailed {
  type: typeof actionTypes.USER_SUBMIT_AVATAR_FAILED;
  message: string;
}