import { actionTypes, IAuthState, AuthActions } from './types';

const {
  AUTH_MESSAGE_CLEAR,
  AUTH_RESET,
  AUTH_UPDATE_LOCAL_AVATAR,
  AUTH_STAFF_DISPLAY,
  AUTH_STAFF_LOGIN_FAILED,
  AUTH_STAFF_LOGOUT,
  AUTH_STAFF_LOGOUT_FAILED,
  AUTH_USER_DISPLAY,
  AUTH_USER_LOGIN_FAILED,
  AUTH_USER_LOGOUT,
  AUTH_USER_LOGOUT_FAILED,
  AUTH_USER_REGISTER_FAILED,
  AUTH_USER_VERIFY_FAILED
} = actionTypes;

const initialState: IAuthState = {
  authname: '',
  avatar: '',
  message: '',
  staffIsAuthenticated: false,
  userIsAuthenticated: false
};

export const authReducer = (
  state = initialState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case AUTH_MESSAGE_CLEAR:
      return {...state, ...{message: ''}};

    case AUTH_UPDATE_LOCAL_AVATAR:
      return {...state, ...{avatar: action.avatar}};

    case AUTH_STAFF_DISPLAY:
      return {
        ...state,
        ...{
          staffIsAuthenticated: true,
          authname: action.authname,
          avatar: action.avatar
        }
      };
    
    case AUTH_USER_DISPLAY:
      return {
        ...state,
        ...{
          userIsAuthenticated: true,
          authname: action.authname,
          avatar: action.avatar
        }
      };
    
    case AUTH_STAFF_LOGIN_FAILED:
    case AUTH_STAFF_LOGOUT_FAILED:
    case AUTH_USER_LOGIN_FAILED:
    case AUTH_USER_LOGOUT_FAILED:
    case AUTH_USER_REGISTER_FAILED:
    case AUTH_USER_VERIFY_FAILED:
      return {...state, ...{message: action.message}};

    case AUTH_RESET:
    case AUTH_USER_LOGOUT:
    case AUTH_STAFF_LOGOUT:
      return {...state, ...initialState};
      
    default: return state;
  }
};