export const actionTypes = {FOCUSED: 'FOCUSED'} as const;

export interface IState {
  focused: boolean
}

export type Actions = IFocused;

interface IFocused {
  type:    typeof actionTypes.FOCUSED;
  focused: boolean;
}
