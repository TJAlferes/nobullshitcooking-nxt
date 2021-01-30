import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { useTypedSelector as useSelector } from '../store';
import { END } from 'redux-saga';

import '../../styles/global.css';
import { Footer } from '../components/App/Footer/Footer';
//import MobileHeader from '../components/App/Header/mobile/MobileHeader';
import { Header } from '../components/App/Header/desktop/Header';
import { Main } from '../components/App/Main/Main';
import { SagaStore, wrapper } from '../store';

class NOBSCApp extends App<AppInitialProps>{
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // wait for all page actions to dispatch
    const pageProps = {...(
      Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    )};

    // stop saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await (ctx.store as SagaStore).sagaTask?.toPromise();
    }

    return {pageProps};
  };

  public render() {
    const { Component, pageProps } = this.props;

    const { pathname } = useRouter();

    const dataContentTypes = useSelector(state => state.data.contentTypes);
    const shadow = useSelector(state => state.menu.shadow);
    const headerTheme = useSelector(state => state.theme.headerTheme);
    const footerTheme = useSelector(state => state.theme.footerTheme);
    const mainTheme = useSelector(state => state.theme.mainTheme);

    const atAuthPage =
      pathname.match(/\/login/) ||
      pathname.match(/\/register/) ||
      pathname.match(/\/verify/);
    
    return atAuthPage
    ? <Component contentTypes={dataContentTypes} {...pageProps} />
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
          <Component contentTypes={dataContentTypes} {...pageProps} />
        </Main>
        <Footer theme={footerTheme} />
      </div>
    );
  }
}

//import { SearchProvider } from '@elastic/react-search-ui';
export default wrapper.withRedux(NOBSCApp);

/*export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}*/