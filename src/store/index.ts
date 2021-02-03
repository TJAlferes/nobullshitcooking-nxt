import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
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
import { dataInit } from './data/actions';
import { rootReducer, RootState } from './rootReducer';
import { rootSaga } from './rootSaga';

/*
const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();

WONT WORK BECAUSE YOU HAVE TO CREATE A BRAND NEW STORE EVERY TIME IN SSR?
... or can it?
export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
*/

export const makeStore = (context: Context) => {
  const persistedState = loadFromLocalStorage();  // preloadedState?
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  store.dispatch(dataInit());  // do through Next.js now
  store.subscribe(() => saveToLocalStorage(store.getState()));

  initWindowBlurHandler(store);
  initWindowFocusHandler(store);

  return store;
};

export const wrapper = createWrapper(makeStore, {debug: true});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface SagaStore extends Store {
  sagaTask?: Task;
}