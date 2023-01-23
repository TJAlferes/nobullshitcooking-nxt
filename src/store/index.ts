import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { Context, createWrapper }                from 'next-redux-wrapper';
import { useSelector, TypedUseSelectorHook }     from 'react-redux';
import type { Store }                            from 'redux';
import createSagaMiddleware, { Task }            from 'redux-saga';
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { initWindowBlurHandler, initWindowFocusHandler } from '../utils/nobscappWindow';
import { loadFromLocalStorage, saveToLocalStorage }      from '../utils/storageHelpers';
//import { dataInit } from './data/actions';
import { rootReducer, RootState }                        from './rootReducer';
import { rootSaga }                                      from './rootSaga';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function makeStore(context: Context) {
  const persistedState = loadFromLocalStorage();  // Do this in _app.page.tsx getInitialProps instead?  if (typeof window === 'undefined') then no localStore
  const sagaMiddleware = createSagaMiddleware();
  const options: ConfigureStoreOptions = {
    reducer:        rootReducer,
    preloadedState: persistedState,
    middleware:     [sagaMiddleware]
  };
  const store = configureStore(options);

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  store.subscribe(() => saveToLocalStorage(store.getState()));  // Do this in _app.page.tsx getInitialProps instead?  if (typeof window === 'undefined') then no localStore

  initWindowBlurHandler(store);
  initWindowFocusHandler(store);

  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore);

export interface SagaStore extends Store {
  sagaTask?: Task;
}