import { SagaMiddleware } from 'redux-saga';

import { watchAuth } from './auth';
import { watchAvatar } from './avatar';
import { watchContent } from './content';
import { watchData } from './data';
import { watchEquipment } from './equipment';
import { watchFavorite } from './favorite';
import { watchFriendship } from './friendship';
import { watchIngredient } from './ingredient';
import { watchMessenger } from './messenger';
import { watchPlan } from './plan';
import { watchRecipe } from './recipe';
import { watchSave } from './save';

// fork or something? or just leave as is?
export function runWatchers(sagaMiddleware: SagaMiddleware<object>) {
  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchAvatar);
  sagaMiddleware.run(watchContent);
  sagaMiddleware.run(watchData);
  sagaMiddleware.run(watchEquipment);
  sagaMiddleware.run(watchFavorite);
  sagaMiddleware.run(watchFriendship);
  sagaMiddleware.run(watchIngredient);
  sagaMiddleware.run(watchMessenger);
  sagaMiddleware.run(watchPlan);
  sagaMiddleware.run(watchRecipe);
  sagaMiddleware.run(watchSave);
}