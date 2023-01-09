import { actionTypes } from './types';

const { SUBMIT_AVATAR } = actionTypes;

export const submitAvatar = (fullAvatar: File | null, tinyAvatar: File | null) => ({type: SUBMIT_AVATAR, fullAvatar, tinyAvatar});