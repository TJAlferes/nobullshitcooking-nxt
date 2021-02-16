import { actionTypes } from './types';

const { USER_SUBMIT_AVATAR } = actionTypes;

export const userSubmitAvatar = (
  fullAvatar: File | null,
  tinyAvatar: File | null
) => ({
  type: USER_SUBMIT_AVATAR,
  fullAvatar,
  tinyAvatar
});