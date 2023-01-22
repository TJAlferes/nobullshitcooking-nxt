import { SearchProvider }                   from '@elastic/react-search-ui';
import type { AppContext, AppProps }        from 'next/app';
import { useRef }                           from 'react';
import { DndProvider }                      from 'react-dnd-multi-backend';
import { Provider }                         from 'react-redux';
import { HTML5toTouch }                     from 'rdndmb-html5-to-touch';
import { END }                              from 'redux-saga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate }                          from 'react-query/hydration';

import '../../styles/styles.css';
import { Header, Main, Footer, LeftNav }                       from '../components';
import { makeSearchConfig }                                    from '../config/search';
import { SagaStore, wrapper, useTypedSelector as useSelector } from '../store';
import { chatInit }                                            from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const leftNav = false;  //useSelector(state => state.menu.leftNav); // can't use here

  const { store, props } = wrapper.useWrappedStore(rest);

  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) queryClientRef.current = new QueryClient();

  const { pathname } = props.pageProps.router;
  const atAuthPage = pathname.match(/\/login/) || pathname.match(/\/register/) || pathname.match(/\/verify/);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={props.pageProps ? props.pageProps.dehydratedState: {}}>
          <SearchProvider config={props.pageProps.searchConfig}>
            <DndProvider options={HTML5toTouch}>

              {atAuthPage ? <Component {...props.pageProps} /> : (
                <div id="app">
                  {leftNav && <LeftNav />}
                  <div className={leftNav ? 'shadow--show' : 'shadow--hide'}></div>
                  <div id="layout">
                    <Header />
                    <Main>
                      <Component {...props.pageProps} />
                    </Main>
                    <Footer />
                  </div>
                </div>
              )}

            </DndProvider>
          </SearchProvider>
        </Hydrate>
      </QueryClientProvider>
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

    if (ctx.req) {  // if server-side, stop saga
      ctx.store?.dispatch(END);
      await (ctx.store as SagaStore)?.sagaTask?.toPromise();
    }
    else chatInit(store);

    return {pageProps};
  }
);
