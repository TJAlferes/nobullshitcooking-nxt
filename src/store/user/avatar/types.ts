export const actionTypes = {
  USER_SUBMIT_AVATAR: 'USER_SUBMIT_AVATAR'
} as const;

export interface IUserSubmitAvatar {
  type: typeof actionTypes.USER_SUBMIT_AVATAR;
  fullAvatar: File | null;  // rename to avatarFull ?
  tinyAvatar: File | null;  // rename to avatarTiny ?
}