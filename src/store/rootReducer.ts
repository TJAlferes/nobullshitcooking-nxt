import { combineReducers } from 'redux';

import { authReducer } from './auth/reducer';
import { cartReducer } from './cart/reducer';
import { chatReducer } from './chat/reducer';
import { dataReducer } from './data/reducer';
import { editorReducer } from './editor/reducer';
import { geolocationReducer } from './geolocation/reducer';
import { menuReducer } from './menu/reducer';
import { nobscappReducer } from './nobscapp/reducer';
import { plannerReducer } from './planner/reducer';
import { plannerViewReducer } from './plannerView/reducer';
import { searchReducer } from './search/reducer';
import { staffReducer } from './staff/reducer';
import { themeReducer } from './theme/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  chat: chatReducer,
  data: dataReducer,
  editor: editorReducer,
  geolocation: geolocationReducer,
  menu: menuReducer,
  nobscapp: nobscappReducer,
  planner: plannerReducer,
  plannerView: plannerViewReducer,
  search: searchReducer,
  staff: staffReducer,
  theme: themeReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;