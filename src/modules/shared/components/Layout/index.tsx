import type { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Header, Main, Footer } from '../../components';

export function Layout({ children }: Props) {
  const { pathname } = useRouter();

  const authPage = pathname.match(/\/login/) || pathname.match(/\/register/) || pathname.match(/\/verify/);

  // This layout does not apply to auth pages.
  return authPage
    ? <>{children}</>
    : (
      <div id="layout">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    );
}

type Props = {
  children: ReactNode;
};
