import type { ReactNode } from 'react';

import { Breadcrumbs } from '..';

export function Main({ children }: Props): JSX.Element {
  return (
    <main className="main">
      <Breadcrumbs />
      {children}
    </main>
  );
};

type Props = {
  children?: ReactNode;
};