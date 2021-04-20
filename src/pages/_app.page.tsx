import { SearchProvider } from '@elastic/react-search-ui';
import { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { useStore } from 'react-redux';
import { END } from 'redux-saga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import '../../styles/global.css';
import { Footer } from '../components/App/Footer/Footer';
import { Header } from '../components/App/Header/Header';
import { Main } from '../components/App/Main/Main';
import { makeSearchConfig } from '../config/search';
import { SagaStore, wrapper } from '../store';
import { chatInit } from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

function NOBSCApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>();

  if (!queryClientRef.current) queryClientRef.current = new QueryClient();

  const { pathname } = useRouter();
  // Not needed with getInitialProps? store is passed as a prop?
  const store = useStore();

  const atAuthPage =
    pathname.match(/\/login/) ||
    pathname.match(/\/register/) ||
    pathname.match(/\/verify/);
  
  const searchConfig = makeSearchConfig(store);
  //chatInit(store);

  // move these back to App.tsx? and make _app.page.tsx like old index.tsx?
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <SearchProvider config={searchConfig}>
          <DndProvider options={HTML5toTouch}>
            {atAuthPage
              ? <Component {...pageProps} />
              : (
                <div id="app">
                  <Header />
                  <Main><Component {...pageProps} /></Main>
                  <Footer />
                </div>
              )}
          </DndProvider>
        </SearchProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

// Will disable ASO
NOBSCApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  //import App from 'next/app';
  //App.getInitialProps() ???
  // wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  };

  // stop saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask?.toPromise();
  } else {
    //const searchConfig = makeSearchConfig(ctx.store);
    //chatInit(ctx.store);
    //pageProps.
  }

  return {pageProps};
};

export default wrapper.withRedux(NOBSCApp);