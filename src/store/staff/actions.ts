import { actionTypes } from './types';

const { STAFF_MESSAGE, STAFF_MESSAGE_CLEAR } = actionTypes;

export const staffMessage = (message: string) => ({type: STAFF_MESSAGE, message});

export const staffMessageClear = () => ({type: STAFF_MESSAGE_CLEAR});