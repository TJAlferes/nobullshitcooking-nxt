import { SearchProvider } from '@elastic/react-search-ui';
import { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
//import { useStore } from 'react-redux';
import { END } from 'redux-saga';

import '../../styles/global.css';
import { Footer } from '../components/App/Footer/Footer';
//import MobileHeader from '../components/App/Header/mobile/MobileHeader';
import { Header } from '../components/App/Header/desktop/Header';
import { Main } from '../components/App/Main/Main';
import { searchConfig } from '../config/searchConfig';
import { SagaStore, useTypedSelector as useSelector, wrapper } from '../store';
import { initializeSocketIOEventHandlers } from '../store/messenger/sagas';

function NOBSCApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  //const store = useStore();  // Not required? The store is passed as a prop?
  
  // ???
  const contentTypes = useSelector(state => state.data.contentTypes);
  // Just useContext for menu shadow?
  const shadow = useSelector(state => state.menu.shadow);
  // Just useContext for themes?
  const { headerTheme, footerTheme, mainTheme } =
    useSelector(state => state.theme);

  const atAuthPage =
    pathname.match(/\/login/) ||
    pathname.match(/\/register/) ||
    pathname.match(/\/verify/);
  
  // move these back to App.tsx? and make _app.page.tsx like old index.tsx?
  return (
    <SearchProvider config={searchConfig}>
      <DndProvider options={HTML5toTouch}>
        {atAuthPage
          ? <Component contentTypes={contentTypes} {...pageProps} />
          : (
            <div id="app">
              <div>
                {/*<div className="mobile_display">
                  <MobileHeader theme={headerTheme} />
                </div>*/}
                <div className="desktop_display">
                  <Header theme={headerTheme} />
                </div>
              </div>
              <Main theme={mainTheme} shadow={shadow} >
                <Component contentTypes={contentTypes} {...pageProps} />
              </Main>
              <Footer theme={footerTheme} />
            </div>
          )}
      </DndProvider>
    </SearchProvider>
  );
}

const getInitialProps = async ({ Component, ctx }: AppContext) => {
  // wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  };

  // stop saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask?.toPromise();
  } else {
    // pass store to searchConfig
    //const searchConfig = searchConfigInit(store);

    // pass store to messenger sagas
    initializeSocketIOEventHandlers(ctx.store);
    //

  }

  return {pageProps};
};

export default wrapper.withRedux(NOBSCApp);