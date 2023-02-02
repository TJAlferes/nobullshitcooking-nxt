import { SearchProvider } from '@elastic/react-search-ui';
import type { AppProps }  from 'next/app';
import { DndProvider }    from 'react-dnd-multi-backend';
import { Provider }       from 'react-redux';
import { HTML5toTouch }   from 'rdndmb-html5-to-touch';

import '../../styles/styles.css';
import { Theme, Layout, LeftNav } from '../components';
import { makeSearchConfig }       from '../config/search';
import { wrapper }                from '../store';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const searchConfig =     makeSearchConfig(store);

  return (
    <Provider store={store}>
      <SearchProvider config={searchConfig}>
        <DndProvider options={HTML5toTouch}>
          <Theme>
            <div id="app">
              <LeftNav />
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </div>
          </Theme>
        </DndProvider>
      </SearchProvider>
    </Provider>
  );
}
