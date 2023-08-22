import type { AppProps }      from 'next/app';
import { DndProvider as Dnd } from 'react-dnd-multi-backend';
import { Provider as Redux }  from 'react-redux';
import { HTML5toTouch }       from 'rdndmb-html5-to-touch';

import '../../styles/styles.css';
import { Layout, Guard, Theme }     from '../modules/shared/components';
import { SearchProvider as Search } from '../modules/shared/search/hook';
import { wrapper }                  from '../store';

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Redux store={store}>
      <Dnd options={HTML5toTouch}>
        <Search>
          <Guard>
            <Theme>
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </Theme>
          </Guard>
        </Search>
      </Dnd>
    </Redux>
  );
}
