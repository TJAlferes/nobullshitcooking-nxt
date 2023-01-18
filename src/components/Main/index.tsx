import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { Breadcrumbs } from '..';
import { useTypedSelector as useSelector } from '../../store';

export function Main({ children }: Props): JSX.Element {
  const { pathname } = useRouter();
  //const shadow = useSelector(state => state.menu.shadow);
  const theme = useSelector(state => state.theme.theme);

  const isHome = pathname.match(/^\/$/);  // so that breadcrumbs aren't displayed at all on the home page

  return (
    <main className={`main ${theme}`}>
      {/*<div className={shadow ? 'shadow--show' : 'shadow--hide'}></div>*/}
      {!isHome && <Breadcrumbs />}
      {children}
    </main>
  );
};

type Props = {
  children?: ReactNode;
};