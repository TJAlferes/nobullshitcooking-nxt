import { Context, createWrapper } from 'next-redux-wrapper';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, { Task } from 'redux-saga';

import {
  initWindowBlurHandler,
  initWindowFocusHandler
} from '../utils/nobscappWindow';
import {
  loadFromLocalStorage,
  saveToLocalStorage
} from '../utils/storageHelpers';
//import { dataInit } from './data/actions';
import { rootReducer, RootState } from './rootReducer';
import { rootSaga } from './rootSaga';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function makeStore(context: Context) {
  // Do this in _app.page.tsx getInitialProps instead?
  // if (typeof window === 'undefined') then don't do localStore stuff?
  const persistedState = loadFromLocalStorage();

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // Do this in _app.page.tsx getInitialProps instead?
  // if (typeof window === 'undefined') then don't do localStore stuff?
  store.subscribe(() => saveToLocalStorage(store.getState()));

  initWindowBlurHandler(store);
  initWindowFocusHandler(store);

  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore);

export interface SagaStore extends Store {
  sagaTask?: Task;
}