export const actionTypes = {
  USER_MESSAGE: 'USER_MESSAGE',
  USER_MESSAGE_CLEAR: 'USER_MESSAGE_CLEAR'
} as const;

/*

State

*/

export interface IUserState {
  message: string;
}

/*

Actions

*/

export type UserActions = IUserMessage | IUserMessageClear;

export interface IUserMessage {
  type: typeof actionTypes.USER_MESSAGE;
  message: string;
}

export interface IUserMessageClear {
  type: typeof actionTypes.USER_MESSAGE_CLEAR;
}