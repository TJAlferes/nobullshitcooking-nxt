

const initialState: State = {leftNav: false};

export const menuReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case LEFT_NAV:
      return {...state, leftNav: !state.leftNav};
    default:
      return state;
  }
};



export const toggleLeftNav =  () => ({type: LEFT_NAV});



export const actionTypes = {
  LEFT_NAV: 'LEFT_NAV'
} as const;

const { LEFT_NAV } = actionTypes;

export type State = {
  leftNav: boolean;
}

export type Actions = ToggleLeftNav;

type ToggleLeftNav = {
  type: typeof actionTypes.LEFT_NAV;
}
