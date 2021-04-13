import { actionTypes, IAuthState, AuthActions } from './types';

const {
  AUTH_MESSAGE,
  AUTH_MESSAGE_CLEAR,
  AUTH_RESET,
  AUTH_UPDATE_LOCAL_AVATAR,
  AUTH_STAFF_DISPLAY,
  AUTH_STAFF_LOGOUT,
  AUTH_USER_DISPLAY,
  AUTH_USER_LOGOUT
} = actionTypes;

const initialState: IAuthState = {
  authname: '',
  message: '',
  staffIsAuthenticated: false,
  userIsAuthenticated: false
};

export const authReducer = (
  state = initialState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case AUTH_MESSAGE:
      return {...state, ...{message: action.message}};
    
    case AUTH_MESSAGE_CLEAR:
      return {...state, ...{message: ''}};

    case AUTH_UPDATE_LOCAL_AVATAR:
      return {...state, ...{avatar: action.avatar}};

    case AUTH_STAFF_DISPLAY:
      return {
        ...state,
        ...{
          staffIsAuthenticated: true,
          authname: action.authname
        }
      };
    
    case AUTH_USER_DISPLAY:
      return {
        ...state,
        ...{
          userIsAuthenticated: true,
          authname: action.authname
        }
      };
    
    case AUTH_RESET:
    case AUTH_USER_LOGOUT:
    case AUTH_STAFF_LOGOUT:
      return {...state, ...initialState};
      
    default: return state;
  }
};