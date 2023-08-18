

const initialState: State = {theme: "light"};

export const themeReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case DARK:  return {...state, theme: "dark"};
    case LIGHT: return {...state, theme: "light"};
    default:    return state;
  }
};



export const dark =  () => ({type: DARK});

export const light = () => ({type: LIGHT});



export const actionTypes = {
  DARK:  'DARK',
  LIGHT: 'LIGHT'
} as const;

const { DARK, LIGHT } = actionTypes;

export type State = {
  theme: string;
};

export type Actions = Dark | Light;

type Dark = {
  type: typeof actionTypes.DARK
};

type Light = {
  type: typeof actionTypes.LIGHT
};
