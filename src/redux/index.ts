import { combineReducers, configureStore, ConfigureStoreOptions, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook }                      from 'react-redux';
import { Context, createWrapper }                                              from 'next-redux-wrapper';
import type { Action, Store }                                                  from 'redux';
import createSagaMiddleware, { END, Task }                                     from 'redux-saga';
import { fork }                                                                from 'redux-saga/effects';

import { themeReducer }                                  from '../modules/general/ThemeProvider/state';
import { initWindowBlurHandler, initWindowFocusHandler } from '../modules/general/window';
import { windowReducer }                                 from '../modules/general/window/state';
import { loadFromLocalStorage, saveToLocalStorage }      from '../modules/general/localStorage';

import { geolocationReducer } from '../modules/shared/geolocation/state';

import { menuReducer }        from '../modules/shared/menu/state';

import { searchWatcher }      from '../modules/shared/search/network';
import { searchReducer }      from '../modules/shared/search/state';

import { systemReducer }      from '../modules/shared/system/state';

import { dataWatcher }                         from '../modules/shared/data/network';
import { dataReducer, getInitialData }         from '../modules/shared/data/state';

import { userDataWatcher }                     from '../modules/user/private/data/network';
import { userDataReducer, getInitialUserData } from '../modules/user/private/data/state';

import { authenticationReducer }               from '../modules/user/authentication/state';

import { setupChat, chatWatcher } from '../modules/chat/network';
import { chatReducer }            from '../modules/chat/state';

function makeStore(context: Context) {
  const persistedState = typeof window !== 'undefined' ? loadFromLocalStorage() : {};
  const sagaMiddleware = createSagaMiddleware();

  const options: ConfigureStoreOptions = {
    reducer:        rootReducer,
    preloadedState: persistedState,
    middleware:     [sagaMiddleware],
    devTools:       false
  };
  const store = configureStore(options);

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  if (typeof window === 'undefined') return store;

  store.subscribe(() => saveToLocalStorage(store.getState()));

  setupChat(store);  // start socket.io

  initWindowBlurHandler(store);
  initWindowFocusHandler(store);

  return store;
};

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  chat:           chatReducer,
  data:           dataReducer,
  geolocation:    geolocationReducer,
  menu:           menuReducer,
  search:         searchReducer,
  //ssr:            ssrReducer,
  system:         systemReducer,
  theme:          themeReducer,
  userData:       userDataReducer,
  window:         windowReducer
});

export function* rootSaga() {
  yield fork(chatWatcher);
  yield fork(dataWatcher);
  yield fork(searchWatcher);
  yield fork(userDataWatcher);
}

export const wrapper = createWrapper<SagaStore>(makeStore, {debug: false});

export function staticProps() {
  return wrapper.getStaticProps(
    store => async (context) => {
      store.dispatch(getInitialData());
      store.dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
      return {props: {}};
    }
  );
}

export const useTypedDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;  //ReturnType<AppStore["getState"]>;
export type AppDispatch = SagaStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
//export type AppSaga ?

export interface SagaStore extends Store<RootState> {
  sagaTask?: Task;
}
