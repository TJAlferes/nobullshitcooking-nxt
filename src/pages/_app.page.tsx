import type { AppProps }  from 'next/app';
import { DndProvider }    from 'react-dnd-multi-backend';
import { Provider }       from 'react-redux';
import { HTML5toTouch }   from 'rdndmb-html5-to-touch';

import '../../styles/styles.css';
import { Layout, LeftNav, Guard, Theme } from '../components';
import { wrapper }                       from '../store';

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>
        <Guard>
          <Theme>
            <div id="app">
              <LeftNav />
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </div>
          </Theme>
        </Guard>
      </DndProvider>
    </Provider>
  );
}
