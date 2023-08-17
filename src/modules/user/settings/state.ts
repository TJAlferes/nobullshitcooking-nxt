// reducer ---------------------------------------------------------------------



// action creators -------------------------------------------------------------

export const submitAvatar = (
  fullAvatar: File | null,
  tinyAvatar: File | null
) => ({
  type: SUBMIT_AVATAR,
  fullAvatar,
  tinyAvatar
});

// types -----------------------------------------------------------------------

export const actionTypes = {
  SUBMIT_AVATAR: 'USER_SUBMIT_AVATAR'
} as const;

const { SUBMIT_AVATAR } = actionTypes;

export type SubmitAvatar = {
  type:        typeof actionTypes.SUBMIT_AVATAR;
  full_avatar: File | null;  // rename to avatarFull ?
  tiny_avatar: File | null;  // rename to avatarTiny ?
};
