import { actionTypes, ISSRState } from './types';

const { HYDRATE, SERVER_ACTION, CLIENT_ACTION, APP, PAGE } = actionTypes;

const initialState = {server: 'init', client: 'init', app: 'init', page: 'init' /*tick: 'init'*/};

export const ssrReducer = (state: ISSRState = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.app === 'init')  delete action.payload.app;
      if (action.payload.page === 'init') delete action.payload.page;
      return {...state, ...action.payload};  // which one ??? //return {...state, server: {...state.server, ...action.payload.server}};
    
    case SERVER_ACTION: return {...state, server: {...state.server, tick: action.payload.server}};
    case CLIENT_ACTION: return {...state, client: {...state.client, tick: action.payload.server}};
    case APP:           return {...state, app: action.payload};
    case PAGE:          return {...state, page: action.payload};
    default:            return state;
  }
};