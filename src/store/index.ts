import { combineReducers, configureStore, ConfigureStoreOptions, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook }                      from 'react-redux';
import { Context, createWrapper }                                              from 'next-redux-wrapper';
import type { Action, Store }                                                  from 'redux';
import createSagaMiddleware, { END, Task }                                     from 'redux-saga';
import { fork }                                                                from 'redux-saga/effects';

import { initWindowBlurHandler, initWindowFocusHandler } from '../utils/nobscappWindow';
import { loadFromLocalStorage, saveToLocalStorage }      from '../utils/storageHelpers';
import { chatInit }           from './chat/sagas';
import { init, initUser }     from './data/actions';
import { authReducer }        from './auth/reducer';
import { cartReducer }        from './cart/reducer';
import { chatReducer }        from './chat/reducer';
import { dataReducer }        from './data/reducer';
import { geolocationReducer } from './geolocation/reducer';
import { menuReducer }        from './menu/reducer';
import { nobscappReducer }    from './nobscapp/reducer';
import { plannerReducer }     from './planner/reducer';
import { plannerViewReducer } from './plannerView/reducer';
import { searchReducer }      from './search/reducer';
//ssrReducer
import { staffReducer }       from './staff/reducer';
import { themeReducer }       from './theme/reducer';
import { userReducer }        from './user/reducer';
import {
  watchAuth,
  watchAvatar,
  watchChat,
  watchData,
  watchEquipment,
  watchFavorite,
  watchFriendship,
  watchIngredient,
  watchPlan,
  watchRecipe,
  watchSave
} from './watchers';

function makeStore(context: Context) {
  const persistedState = (typeof window !== 'undefined') ? loadFromLocalStorage() : {};
  const sagaMiddleware = createSagaMiddleware();

  const options: ConfigureStoreOptions = {
    reducer:        rootReducer,
    preloadedState: persistedState,
    middleware:     [sagaMiddleware]
  };
  const store = configureStore(options);

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  if (typeof window !== 'undefined') {
    store.subscribe(() => saveToLocalStorage(store.getState()));
    chatInit(store);  // start socket.io (is this being called on EVERY re-route???)
    initWindowBlurHandler(store);
    initWindowFocusHandler(store);
    console.log('makeStore browser')
  }

  return store;
};

export const rootReducer = combineReducers({
  auth:        authReducer,
  cart:        cartReducer,
  chat:        chatReducer,
  data:        dataReducer,
  geolocation: geolocationReducer,
  menu:        menuReducer,
  nobscapp:    nobscappReducer,
  planner:     plannerReducer,
  plannerView: plannerViewReducer,
  search:      searchReducer,
  //ssr
  staff:       staffReducer,
  theme:       themeReducer,
  user:        userReducer,
});

export function* rootSaga() {
  yield fork(watchAuth);
  yield fork(watchAvatar);
  yield fork(watchChat);
  yield fork(watchData);
  yield fork(watchEquipment);
  yield fork(watchFavorite);
  yield fork(watchFriendship);
  yield fork(watchIngredient);
  yield fork(watchPlan);
  yield fork(watchRecipe);
  yield fork(watchSave);
}

export const wrapper = createWrapper<SagaStore>(makeStore, {debug: true});

export function initialProps() {
  return wrapper.getInitialPageProps(
    store => async (context) => {
      store.dispatch(init());
      store.dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
      return {props: {}};
    }
  );
}

export function initialUserProps() {
  return wrapper.getInitialPageProps(
    store => async (context) => {
      store.dispatch(init());
      store.dispatch(initUser());
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