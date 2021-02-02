export const actionTypes = {
  NOBSCAPP_WINDOW_FOCUSED: 'NOBSCAPP_WINDOW_FOCUSED'
} as const;

/*

State

*/

export interface INOBSCAppState {
  windowFocused: boolean
}

/*

Actions

*/

export type NOBSCAppActions = INOBSCAppWindowFocused;

interface INOBSCAppWindowFocused {
  type: typeof actionTypes.NOBSCAPP_WINDOW_FOCUSED
  condition: boolean
}