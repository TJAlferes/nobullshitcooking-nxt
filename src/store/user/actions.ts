import { actionTypes } from './types';

const { USER_MESSAGE, USER_MESSAGE_CLEAR } = actionTypes;

export const userMessage =      (message: string) => ({type: USER_MESSAGE, message});
export const userMessageClear = () =>                ({type: USER_MESSAGE_CLEAR});
