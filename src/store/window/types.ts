export const actionTypes = {
  FOCUSED: 'FOCUSED'
} as const;

export type State = {
  focused: boolean;
};

export type Actions = Focused;

type Focused = {
  type:    typeof actionTypes.FOCUSED;
  focused: boolean;
};
