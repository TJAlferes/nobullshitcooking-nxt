import axios from 'axios';
import { combineReducers, configureStore, ConfigureStoreOptions, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook }                      from 'react-redux';
import { Context, createWrapper }                                              from 'next-redux-wrapper';
import type { Action, Store }                                                  from 'redux';
import createSagaMiddleware, { END, Task }                                     from 'redux-saga';
import { fork }                                                                from 'redux-saga/effects';

import { endpoint } from '../utils/api';
import { initWindowBlurHandler, initWindowFocusHandler } from '../utils/window';
import { loadFromLocalStorage, saveToLocalStorage }      from '../utils/storage';
import { chatInit }           from './chat/sagas';
import { init, initUser, getInitialUserData }     from './data/actions';
import { authReducer }        from './auth/reducer';
import { cartReducer }        from './cart/reducer';
import { chatReducer }        from './chat/reducer';
import { dataReducer }        from './data/reducer';
import { geolocationReducer } from './geolocation/reducer';
import { menuReducer }        from './menu/reducer';
import { plannerReducer }     from './planner/reducer';
import { plannerViewReducer } from './plannerView/reducer';
import { searchReducer }      from './search/reducer';
//ssrReducer
import { staffReducer }       from './staff/reducer';
import { themeReducer }       from './theme/reducer';
import { userReducer }        from './user/reducer';
import { windowReducer }      from './window/reducer';
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
  watchSave,
  watchSearch
} from './watchers';

function makeStore(context: Context) {
  const persistedState = (typeof window !== 'undefined') ? loadFromLocalStorage() : {};
  const sagaMiddleware = createSagaMiddleware();

  const options: ConfigureStoreOptions = {
    reducer:        rootReducer,
    preloadedState: persistedState,
    middleware:     [sagaMiddleware],
    devTools:       false
  };
  const store = configureStore(options);

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  if (typeof window !== 'undefined') {
    store.subscribe(() => saveToLocalStorage(store.getState()));
    chatInit(store);  // start socket.io (is this being called on EVERY re-route???) (move socket.io into redux middleware?)
    initWindowBlurHandler(store);
    initWindowFocusHandler(store);
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
  planner:     plannerReducer,
  plannerView: plannerViewReducer,
  search:      searchReducer,
  //ssr
  staff:       staffReducer,
  theme:       themeReducer,
  user:        userReducer,
  window:      windowReducer
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
  yield fork(watchSearch);
}

export const wrapper = createWrapper<SagaStore>(makeStore, {debug: false});

// ideally only called once, but for now in every non-authenticated page
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

// only called once, in Dashboard, when they are redirected there upon being authenticated
export function initialUserProps() {
  return wrapper.getInitialPageProps(
    store => async (context) => {
      store.dispatch(initUser());
      store.dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
      return {props: {}};
    }
  );
}

export function serverUserProps() {
  return wrapper.getServerSideProps(
    store => async (context) => {
      console.log("hi");

      const { data } = await axios.get(`${endpoint}/equipment-type`);
      console.log(data.equipmentTypes);

      //const { data } = await axios.post(`${endpoint}/user/data-init`, {}, {withCredentials: true});
      //console.log(data.myPlans);
      //store.dispatch(getInitialUserData(data));

      //store.dispatch(initUser());
      //store.dispatch(END);
      //await (store as SagaStore).sagaTask?.toPromise();

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
