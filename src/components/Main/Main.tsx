import { useRouter } from 'next/router';
import { FC } from 'react';

import { Breadcrumbs } from '..';
import { useTypedSelector as useSelector } from '../../store';

export const Main: FC = ({ children }): JSX.Element => {
  const { pathname } = useRouter();

  const shadow = useSelector(state => state.menu.shadow);  // useContext?
  const theme = useSelector(state => state.theme.mainTheme);  // useContext?

  // so that breadcrumbs aren't displayed at all on the home page:
  const isHome = pathname.match(/^\/$/);

  return (
    <main className={`main ${theme}`}>
      <div className={shadow ? 'shadow--show' : 'shadow--hide'}></div>

      {!isHome && <Breadcrumbs />}
      
      {children}
    </main>
  );
};