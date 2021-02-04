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
import { dataInit } from './data/actions';
import { rootReducer, RootState } from './rootReducer';
import { rootSaga } from './rootSaga';

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