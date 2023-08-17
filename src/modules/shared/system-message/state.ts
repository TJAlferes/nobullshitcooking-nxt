// reducer ---------------------------------------------------------------------

const initialState: State = {message: ''};

export function systemMessageReducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case SYSTEM_MESSAGE:
      return {...state, message: action.message};
    case SYSTEM_MESSAGE_CLEAR:
      return {...state, message: ''};
    default:
      return state;
  }
}

// action creators -------------------------------------------------------------

export const systemMessage = (message: string) => ({type: SYSTEM_MESSAGE, message});

export const systemMessageClear = () => ({type: SYSTEM_MESSAGE_CLEAR});

// types -----------------------------------------------------------------------

export type State = {
  message: string;
};

export const actionTypes = {
  SYSTEM_MESSAGE:       'SYSTEM_MESSAGE',
  SYSTEM_MESSAGE_CLEAR: 'SYSTEM_MESSAGE_CLEAR'
} as const;

const { SYSTEM_MESSAGE, SYSTEM_MESSAGE_CLEAR } = actionTypes;

export type UserActions = SystemMessage | SystemMessageClear;

export type SystemMessage = {
  type:    typeof actionTypes.SYSTEM_MESSAGE;
  message: string;
};

export type SystemMessageClear = {
  type: typeof actionTypes.SYSTEM_MESSAGE_CLEAR;
};
