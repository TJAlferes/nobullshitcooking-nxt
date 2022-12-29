import { useRouter } from 'next/router';
import { FC } from 'react';

import { Breadcrumbs } from '..';
import { useTypedSelector as useSelector } from '../../store';

export const Main: FC = ({ children }): JSX.Element => {
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