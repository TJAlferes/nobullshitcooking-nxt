import { Context, createWrapper } from 'next-redux-wrapper';
import { useMemo } from 'react';
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

let currentStore: Store | undefined;



export function storeInit(preloadedState: any) {  // preloadedState: typeof initialState ???
  let newStore;

  // 1.
  // If there's not already a current store, then we make one.
  // If there is already a current store, then we just use it for now.
  if (!currentStore) newStore = makeStore(preloadedState);
  else newStore = currentStore;

  // 2.
  // If we're at a page that has its own initial state,
  // then we merge it with the current store's state, and make a store with it.
  //
  // And we reset the current store to undefined.
  if (preloadedState && currentStore) {
    newStore = makeStore({...currentStore.getState(), ...preloadedState});
    currentStore = undefined;
  }

  // 3.
  // If server-side, we make a new store on every request (so they're isolated).
  // If client-side, we make a store only once.
  if (typeof window === 'undefined') return newStore;
  if (!currentStore) currentStore = newStore;
  return newStore;
}

export function useStore(initialState: any) {
  const store = useMemo(() => storeInit(initialState), [initialState]);
  return store;
}



export const makeStore = (context: Context) => {
  // Don't do this here? Do this in _app.page.tsx getInitialProps instead?
  // Because it requires browser/client so won't work on server?
  const persistedState = loadFromLocalStorage();  // preloadedState?

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  store.dispatch(dataInit());  // do through Next.js now

  // Don't do these here? Do these in _app.page.tsx getInitialProps instead?
  // Because they require browser/client so won't work on server?
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