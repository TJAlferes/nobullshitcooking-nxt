import { actionTypes, IUserState, UserActions } from './types';

const { USER_MESSAGE, USER_MESSAGE_CLEAR } = actionTypes;

const initialState: IUserState = {message: ''};

export function userReducer(
  state = initialState,
  action: UserActions
): IUserState {
  switch (action.type) {
    case USER_MESSAGE:return {...state, ...{message: action.message}};
    case USER_MESSAGE_CLEAR:return {...state, ...{message: ''}};
    default: return state;
  }
}