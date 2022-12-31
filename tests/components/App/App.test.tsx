import { SearchProvider } from '@elastic/react-search-ui';
import { mount } from 'enzyme';  // DEAD. Migrate to react-testing-library
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

//import { searchConfig } from '../../../src/config/searchConfig';
import { rootReducer } from '../../../src/store/rootReducer';
import App from '../../../src/components/App/App';

const storeFactory = (initialState = undefined): Store => createStore(rootReducer, initialState);

const store = storeFactory();

const initialProps = {contentTypes: [], footerTheme: 'footer-light', headerTheme: 'header-light', mainTheme: 'main-light', shadow: false};

const mockBreadcrumbs = jest.fn();
jest.mock('../../../src/components/Breadcrumbs/Breadcrumbs', () => ({Breadcrumbs: mockBreadcrumbs}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('App', () => {
  describe('when pathname is /login', () => {
    //<MemoryRouter initialEntries={["/login"]}>
    const wrapper = mount(<Provider store={store}><SearchProvider config={{}}><App {...initialProps} /></SearchProvider></Provider>);

    it('does not display a Header component', () => {
      expect(wrapper.find('.header')).toHaveLength(0);
    });

    it('does not display a Main component', () => {
      expect(wrapper.find('.main')).toHaveLength(0);
    });

    it('does not display a Footer component', () => {
      expect(wrapper.find('.footer')).toHaveLength(0);
    });
  });

  describe('when pathname is /register', () => {
    //<MemoryRouter initialEntries={["/register"]}>
    const wrapper = mount(<Provider store={store}><SearchProvider config={{}}><App {...initialProps} /></SearchProvider></Provider>);

    it('does not display a Header component', () => {
      expect(wrapper.find('.header')).toHaveLength(0);
    });

    it('does not display a Main component', () => {
      expect(wrapper.find('.main')).toHaveLength(0);
    });

    it('does not display a Footer component', () => {
      expect(wrapper.find('.footer')).toHaveLength(0);
    });
  });

  describe('when pathname is /verify', () => {
    //<MemoryRouter initialEntries={["/verify"]}>
    const wrapper = mount(<Provider store={store}><SearchProvider config={{}}><App {...initialProps} /></SearchProvider></Provider>);

    it('does not display a Header component', () => {
      expect(wrapper.find('.header')).toHaveLength(0);
    });

    it('does not display a Main component', () => {
      expect(wrapper.find('.main')).toHaveLength(0);
    });

    it('does not display a Footer component', () => {
      expect(wrapper.find('.footer')).toHaveLength(0);
    });
  });

  describe('when not at auth page', () => {
    //<MemoryRouter initialEntries={["/"]}>
    const wrapper = mount(<Provider store={store}><SearchProvider config={{}}><App {...initialProps} /></SearchProvider></Provider>);

    it('displays a Header component', () => {
      expect(wrapper.find('.header')).toHaveLength(1);
    });

    it('displays a Main component', () => {
      expect(wrapper.find('.main')).toHaveLength(1);
    });

    it('displays a Footer component', () => {
      expect(wrapper.find('.footer')).toHaveLength(1);
    });
  });
});