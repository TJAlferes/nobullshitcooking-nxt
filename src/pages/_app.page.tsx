import { SearchProvider } from '@elastic/react-search-ui';
import { AppContext, AppProps } from 'next/app';
import { useRef } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { END } from 'redux-saga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import '../../styles/styles.css';
import { Header, Main, Footer, LeftNav } from '../components';
import { makeSearchConfig } from '../config/search';
import { SagaStore, wrapper, useTypedSelector as useSelector } from '../store';
import { chatInit } from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

function NOBSCApp({ Component, pageProps }: AppProps) {
  const leftNav = useSelector(state => state.menu.leftNav);

  const { pathname } = pageProps.router;
  const atAuthPage =
    pathname.match(/\/login/) ||
    pathname.match(/\/register/) ||
    pathname.match(/\/verify/);
  
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) queryClientRef.current = new QueryClient();

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps ? pageProps.dehydratedState: {}}>
        <SearchProvider config={pageProps.searchConfig}>
          <DndProvider options={HTML5toTouch}>
            {atAuthPage ? <Component {...pageProps} /> : (
              <div id="app">
                {leftNav && <LeftNav />}
                <div className={leftNav ? 'shadow--show' : 'shadow--hide'}>
                </div>
                <div id="layout">
                  <Header />
                  <Main><Component {...pageProps} /></Main>
                  <Footer />
                </div>
              </div>
            )}
          </DndProvider>
        </SearchProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

NOBSCApp.getInitialProps = wrapper.getInitialAppProps(store =>
  async ({ Component, AppTree, ctx, router }: AppContext) => {
    const pageProps = {
      router,
      searchConfig: makeSearchConfig(store),
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    if (ctx.req) {  // if server-side, stop saga
      ctx.store?.dispatch(END);
      await (ctx.store as SagaStore)?.sagaTask?.toPromise();
    } else {
      chatInit(store);
    }

    return {pageProps};
  }
);

export default wrapper.withRedux(NOBSCApp);