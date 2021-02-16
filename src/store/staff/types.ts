export const actionTypes = {
  STAFF_MESSAGE: 'STAFF_MESSAGE',
  STAFF_MESSAGE_CLEAR: 'STAFF_MESSAGE_CLEAR'
} as const;

/*

State

*/

export interface IStaffState {
  message: string;
}

/*

Actions

*/

export type StaffActions = IStaffMessage | IStaffMessageClear;

export interface IStaffMessage {
  type: typeof actionTypes.STAFF_MESSAGE;
  message: string;
}

export interface IStaffMessageClear {
  type: typeof actionTypes.STAFF_MESSAGE_CLEAR;
}