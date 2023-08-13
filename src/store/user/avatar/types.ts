export const actionTypes = {
  SUBMIT_AVATAR: 'USER_SUBMIT_AVATAR'
} as const;

export type SubmitAvatar = {
  type:        typeof actionTypes.SUBMIT_AVATAR;
  full_avatar: File | null;  // rename to avatarFull ?
  tiny_avatar: File | null;  // rename to avatarTiny ?
};
