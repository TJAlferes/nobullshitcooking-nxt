

const initialState: State = {focused: true};

export const windowReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case FOCUSED:
      return {...state, focused: action.focused};
    default: return state;
  }
};



export const focused = (focused: boolean) => ({type: FOCUSED, focused});



export const actionTypes = {
  FOCUSED: 'FOCUSED'
} as const;

const { FOCUSED } = actionTypes;

export type State = {
  focused: boolean;
};

export type Actions = Focused;

type Focused = {
  type:    typeof actionTypes.FOCUSED;
  focused: boolean;
};
