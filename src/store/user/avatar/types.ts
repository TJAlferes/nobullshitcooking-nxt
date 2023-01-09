export const actionTypes = {SUBMIT_AVATAR: 'USER_SUBMIT_AVATAR'} as const;

export interface ISubmitAvatar {
  type:       typeof actionTypes.SUBMIT_AVATAR;
  fullAvatar: File | null;  // rename to avatarFull ?
  tinyAvatar: File | null;  // rename to avatarTiny ?
}