import React from 'react';
import { useRouter } from 'next/router';

import { Footer } from './Footer/Footer';
//import MobileHeader from './Header/mobile/MobileHeader';
import { Header } from './Header/desktop/Header';
import { Main } from './Main/Main';
import { RoutesList } from '../../routing/Routes';
import { useTypedSelector as useSelector } from '../../store';
import './app.css';

export default function App(): JSX.Element {
  const { pathname } = useRouter();

  const contentTypes = useSelector(state => state.data.contentTypes);
  const shadow = useSelector(state => state.menu.shadow);
  const {
    headerTheme,
    footerTheme,
    mainTheme
  } = useSelector(state => state.theme);

  const atAuthPage =
    pathname.match(/\/login/) ||
    pathname.match(/\/register/) ||
    pathname.match(/\/verify/);

  return atAuthPage
  ? (
    <div>
      <RoutesList contentTypes={contentTypes} />
    </div>
  ) : (
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
        <RoutesList contentTypes={contentTypes}  />
      </Main>
      <Footer theme={footerTheme} />
    </div>
  );
}