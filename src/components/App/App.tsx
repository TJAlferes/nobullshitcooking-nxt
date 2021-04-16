import React from 'react';
import { useRouter } from 'next/router';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { RoutesList } from '../../routing/Routes';
import { useTypedSelector as useSelector } from '../../store';
import './app.css';

export default function App(): JSX.Element {
  const { pathname } = useRouter();

  const contentTypes = useSelector(state => state.data.contentTypes);

  const atAuthPage =
    pathname.match(/\/login/) ||
    pathname.match(/\/register/) ||
    pathname.match(/\/verify/);

  return atAuthPage
    ? <div><RoutesList contentTypes={contentTypes} /></div>
    : (
      <div id="app">
        <Header />
        <Main><RoutesList contentTypes={contentTypes}  /></Main>
        <Footer />
      </div>
    );
}