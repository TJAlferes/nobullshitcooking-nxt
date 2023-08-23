import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  server: 'init',
  client: 'init',
  app:    'init',
  page:   'init'
  /*tick:   'init'*/
};

export const ssrReducer = (state: ISSRState = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.app === 'init') {
        delete action.payload.app;
      }
      if (action.payload.page === 'init') {
        delete action.payload.page;
      }
      //return {...state, server: {...state.server, ...action.payload.server}};  // which one ???
      return {...state, ...action.payload};                                      // which one ???
    
    case SERVER_ACTION:
      return {...state, server: {...state.server, tick: action.payload.server}};
    case CLIENT_ACTION:
      return {...state, client: {...state.client, tick: action.payload.server}};
    case APP:
      return {...state, app: action.payload};
    case PAGE:
      return {...state, page: action.payload};
    default: return state;
  }
};



export const actionTypes = {
  HYDRATE,
  SERVER_ACTION: 'SERVER_ACTION',
  CLIENT_ACTION: 'CLIENT_ACTION',
  APP: 'APP',
  PAGE: 'PAGE'
} as const;

const { SERVER_ACTION, CLIENT_ACTION, APP, PAGE } = actionTypes;

export interface ISSRState {
  server: any;
  client: any;
}

export type SSRActions = IServerAction | IClientAction;

type IServerAction = {
  type:    typeof actionTypes.SERVER_ACTION;
  payload: any;
};

type IClientAction = {
  type:    typeof actionTypes.CLIENT_ACTION;
  payload: any;
};
