import { HYDRATE } from 'next-redux-wrapper';

export const actionTypes = {
  HYDRATE,
  SERVER_ACTION: 'SERVER_ACTION',
  CLIENT_ACTION: 'CLIENT_ACTION',
  APP: 'APP',
  PAGE: 'PAGE'
} as const;

/*

State

*/

export interface ISSRState {
  server: any;
  client: any;
}

/*

Actions

*/

export type SSRActions = IServerAction | IClientAction;

interface IServerAction {
  type: typeof actionTypes.SERVER_ACTION;
  payload: any;
}

interface IClientAction {
  type: typeof actionTypes.CLIENT_ACTION;
  payload: any;
}