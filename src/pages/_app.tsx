import { SearchProvider } from '@elastic/react-search-ui';
import App, { AppContext, AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { Store, Action, AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { END } from 'redux-saga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

//import '../../styles/globals.css';
import { Footer } from '../components/App/Footer/Footer';
import { Header } from '../components/App/Header/Header';
import { Main } from '../components/App/Main/Main';
import { makeSearchConfig } from '../config/search';
import { SagaStore, wrapper } from '../store';
import { RootState } from '../store/rootReducer';
//import { chatInit } from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

class NOBSCApp extends App<AppInitialProps> {
  /*public static getInitialProps = wrapper
    .getInitialAppProps(store => async ({ Component, ctx }: AppContext) => {
      store.dispatch({type: 'TOE', payload: 'was set in _app'});

      return {
        pageProps: {
          ...(
            Component.getInitialProps
              ? await Component.getInitialProps({...ctx, store})
              : {}
          ),
          pathname: ctx.pathname,
        }
      };
    });*/

  // Will disable ASO
  public static getInitialProps = wrapper.getInitialAppProps(store => async ({
    Component,
    AppTree,
    ctx,
    router
  }: AppContext) => {
    // wait for all page actions to dispatch (why?)
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };
  
    // if server-side, stop saga (WHY?)
    if (ctx.req) {
      ctx.store?.dispatch(END);
      await (ctx.store as SagaStore)?.sagaTask?.toPromise();
    }
  
    return {pageProps};
  });

  public render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
  
  /*const queryClientRef = React.useRef<QueryClient>();

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
      <Hydrate state={pageProps ? pageProps.dehydratedState: {}}>
        <SearchProvider config={searchConfig}>
          <DndProvider options={HTML5toTouch}>
            {atAuthPage
              ? <Component {...pageProps} />
              : (
                <div id="app">
                  <Header />
                  <Main>
                    <Component {...pageProps} />
                  </Main>
                  <Footer />
                </div>
              )}
          </DndProvider>
        </SearchProvider>
      </Hydrate>
    </QueryClientProvider>
  );*/
}

export default wrapper.withRedux(NOBSCApp);