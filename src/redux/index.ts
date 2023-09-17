import { loadFromLocalStorage, saveToLocalStorage } from '../modules/general/localStorage';

import { dataReducer }        from '../modules/shared/data/state';
import { geolocationReducer } from '../modules/shared/geolocation/state';
import { systemReducer }      from '../modules/shared/system/state';
import { userDataReducer }    from '../modules/user/private/data/state';

//preloadedState
const persistedState = typeof window !== 'undefined' ? loadFromLocalStorage() : {};
store.subscribe(() => saveToLocalStorage(store.getState()));

export const rootReducer = {
  data:           dataReducer,
  geolocation:    geolocationReducer,
  system:         systemReducer,
  userData:       userDataReducer
};
