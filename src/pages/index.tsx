import { SearchProvider } from '@elastic/react-search-ui';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import { makeSearchConfig } from '../config/search';
import { App } from '../components';

const searchConfig = makeSearchConfig();
const app = (
  <SearchProvider config={searchConfig}>
    <DndProvider options={HTML5toTouch}>
      <App />
    </DndProvider>
  </SearchProvider>
);

//render(app, document.getElementById('root'));

// remove all the above?

export * as Cart from './Cart/Cart';