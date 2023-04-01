export const actionTypes = {
  USER_MESSAGE:       'USER_MESSAGE',
  USER_MESSAGE_CLEAR: 'USER_MESSAGE_CLEAR'
} as const;

export type UserState = {
  message: string;
};

export type UserActions = UserMessage | UserMessageClear;

export type UserMessage = {
  type:    typeof actionTypes.USER_MESSAGE;
  message: string;
};

export type UserMessageClear = {
  type: typeof actionTypes.USER_MESSAGE_CLEAR;
};
