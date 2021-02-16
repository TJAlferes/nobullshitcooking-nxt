import { actionTypes, IStaffState, StaffActions } from './types';

const { STAFF_MESSAGE, STAFF_MESSAGE_CLEAR } = actionTypes;

const initialState: IStaffState = {message: ''};

export function staffReducer(
  state = initialState,
  action: StaffActions
): IStaffState {
  switch (action.type) {
    case STAFF_MESSAGE: return {...state, ...{message: action.message}};
    case STAFF_MESSAGE_CLEAR: return {...state, ...{message: ''}};
    default: return state;
  }
}