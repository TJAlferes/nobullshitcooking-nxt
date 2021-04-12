import { SearchProvider } from '@elastic/react-search-ui';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import { searchConfig } from '../config/searchConfig';
import App from '../components/App/App';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

const app = (
  <SearchProvider config={searchConfig}>
    <DndProvider options={HTML5toTouch}>
      <App />
    </DndProvider>
  </SearchProvider>
);

//render(app, document.getElementById('root'));

export * as Cart from './Cart/Cart';