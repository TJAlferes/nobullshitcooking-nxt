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

import { dataWatcher }        from '../modules/shared/data/network';
import { dataReducer, getInitialData } from '../modules/shared/data/state';
import { geolocationReducer } from '../modules/shared/geolocation/state';
import { menuReducer }        from '../modules/shared/menu/state';
import { searchWatcher }      from '../modules/shared/search/network';
import { searchReducer }      from '../modules/shared/search/state';
import { systemReducer }      from '../modules/shared/system/state';

import { setupChat, chatWatcher } from '../modules/chat/network';
import { chatReducer }            from '../modules/chat/state';

import { planDetailReducer } from '../modules/plan/detail/state';
import { planFormReducer }   from '../modules/plan/form/state';  // split into user/private and user/public ???

import { userAuthenticationWatcher } from '../modules/user/authentication/network';
import { authenticationReducer }     from '../modules/user/authentication/state';

import { friendshipWatcher }        from '../modules/user/private/dashboard/friends/network';
import { settingsWatcher }      from '../modules/user/private/dashboard/settings/network';
import { userDataWatcher }          from '../modules/user/private/data/network';
import { userDataReducer, getInitialUserData } from '../modules/user/private/data/state';
import { equipmentWatcher }  from '../modules/equipment/network';
import { ingredientWatcher } from '../modules/ingredient/network';
import { privatePlanWatcher }       from '../modules/user/private/plan/network';
import { recipeWatcher }     from '../modules/recipe/network';
import { saveRecipeWatcher }        from '../modules/user/private/saved-recipe/network';

import { publicPlanWatcher }     from '../modules/user/public/plan/network';

import { favoriteRecipeWatcher } from '../modules/user/public/favorited-recipe/network';

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
  planDetail:     planDetailReducer,
  planForm:       planFormReducer,
  search:         searchReducer,
  //ssr:            ssrReducer,
  system:         systemReducer,
  theme:          themeReducer,
  userData:       userDataReducer,
  window:         windowReducer
});

export function* rootSaga() {
  yield fork(userAuthenticationWatcher);
  yield fork(settingsWatcher);
  yield fork(chatWatcher);
  yield fork(dataWatcher);
  yield fork(equipmentWatcher);
  yield fork(favoriteRecipeWatcher);
  yield fork(friendshipWatcher);
  yield fork(ingredientWatcher);
  yield fork(privatePlanWatcher);
  yield fork(recipeWatcher);
  yield fork(saveRecipeWatcher);
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
