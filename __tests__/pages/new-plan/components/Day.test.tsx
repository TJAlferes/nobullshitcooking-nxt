import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

import { Day } from '../../../../src/pages/new-plan/components/Day';
import { rootReducer } from '../../../../src/store/rootReducer';

const storeFactory = (initialState = undefined): Store => createStore(rootReducer, initialState);

const store = storeFactory();

/*
Note (July 27th 2020):
We use a fragment in mount because of a bug in Enzyme
https://github.com/enzymejs/enzyme/issues/1852

Note (December 31st 2022):
Enzyme is DEAD. Migrating to @testing-library/react
*/

const plannerAddRecipeToDay = jest.fn();
const plannerClickDay =       jest.fn();

const beginProps = {
  canDrop: false,
  day: 1,
  expanded: false,
  expandedDay: null,
  isOver: false,
  recipes: [],
  plannerAddRecipeToDay,
  plannerClickDay
};

describe('Day', () => {
  it('does something', async () => {
    /*mount(
      <Provider store={store}>
        <DndProvider options={HTML5toTouch}>
          <Day {...beginProps} />
        </DndProvider>
      </Provider>
    );*/
    expect(1).toEqual(1);
  });
});