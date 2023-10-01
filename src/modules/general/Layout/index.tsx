import type { ReactNode } from 'react';
import { useRouter }      from 'next/router';

import { useTheme } from '../../../store';
import { Header }   from './Header';
import { Main }     from './Main';
import { Footer }   from './Footer';

export function Layout({ children }: Props) {
  const { pathname } = useRouter();
  
  const { theme } = useTheme();

  const authPage = pathname.match(/\/login/)
    || pathname.match(/\/register/)
    || pathname.match(/\/verify/);

  // This layout does not apply to auth pages.
  if (authPage) {
    return <>{children}</>;
  }
  
  return (
    <div id="layout" className={`${theme}`}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

type Props = {
  children: ReactNode;
};
