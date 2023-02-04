import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

import { LoaderSpinner } from '../../index';
import { useTypedSelector as useSelector } from '../../../store';

export function Guard({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const authenticatedRoutes = [
    '/chat',
    '/dashboard',
    '/friends',
    '/new-equipment',
    '/new-ingredient',
    '/new-recipe',
    '/new-plan'
  ];
  const authenticatedRoute = pathname && authenticatedRoutes.includes(pathname);

  if ( (typeof window !== "undefined") && authenticatedRoute && !userIsAuthenticated ) {
    router.push('/login');
    return <LoaderSpinner />;
  }

  return children;
}

type Props = {
  children: ReactElement;
};