export const actionTypes = {WINDOW_FOCUSED: 'WINDOW_FOCUSED'} as const;

export interface IState {
  windowFocused: boolean
}

export type Actions = IWindowFocused;

interface IWindowFocused {
  type:      typeof actionTypes.WINDOW_FOCUSED
  condition: boolean
}