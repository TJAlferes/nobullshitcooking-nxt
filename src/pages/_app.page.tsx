import { SearchProvider }                   from '@elastic/react-search-ui';
import type { AppContext, AppProps }        from 'next/app';
import { DndProvider }                      from 'react-dnd-multi-backend';
import { Provider }                         from 'react-redux';
import { HTML5toTouch }                     from 'rdndmb-html5-to-touch';
import { END }                              from 'redux-saga';

import '../../styles/styles.css';
import { Header, Main, Footer, LeftNav } from '../components';
import { makeSearchConfig }              from '../config/search';
import { SagaStore, wrapper }            from '../store';
import { chatInit }                      from '../store/chat/sagas';

/* -------------------------- COOK EAT WIN REPEAT -------------------------- */

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const leftNav = false;  //useSelector(state => state.menu.leftNav);  // Can't use here. See TO DO below.

  const { store, props } = wrapper.useWrappedStore(rest);

  const { pathname } = props.pageProps.router;
  const atAuthPage = pathname.match(/\/login/) || pathname.match(/\/register/) || pathname.match(/\/verify/);

  // TO DO: Move everything inside the providers to Main. Reorganize everything.
  return (
    <Provider store={store}>
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
