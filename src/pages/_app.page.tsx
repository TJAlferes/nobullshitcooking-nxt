import { SearchProvider }               from '@elastic/react-search-ui';
import type { AppContext, AppProps }    from 'next/app';
import { DndProvider }                  from 'react-dnd-multi-backend';
import { Provider }                     from 'react-redux';
import { HTML5toTouch }                 from 'rdndmb-html5-to-touch';
import { END }                          from 'redux-saga';

import '../../styles/styles.css';
import { Theme, Layout, LeftNav } from '../components';
import { makeSearchConfig, SearchConnector }              from '../config/search';
import { SagaStore, wrapper }            from '../store';
import { chatInit }                      from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const searchConfig =     props.pageProps.searchConfig;
  const searchConnector =  new SearchConnector(store);

  return (
    <Provider store={store}>
      <SearchProvider config={{apiConnector: searchConnector, ...searchConfig}}>
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

NOBSCApp.getInitialProps = wrapper.getInitialAppProps(store =>
  async ({ Component, ctx, router }: AppContext) => {
    const pageProps = {
      router,
      searchConfig: makeSearchConfig(store),
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    if (ctx.req) {  // if server-side, stop saga  (why?)
      //ctx.store?.dispatch(END);
      //await (ctx.store as SagaStore)?.sagaTask?.toPromise();
    }
    else chatInit(store);

    return {pageProps};
  }
);
