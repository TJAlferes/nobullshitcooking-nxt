'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement }      from 'react';

import { useTypedSelector as useSelector } from '../../../store';
import { LoaderSpinner }                   from '../../shared/components';

export function RouteGuard({ children }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const authenticatedRoutes = [
    '/chat',
    '/dashboard',
    '/friends',
    '/new-equipment',
    '/new-ingredient',
    //'/new-recipe',
    '/new-plan'
  ];
  const authenticatedRoute = pathname && authenticatedRoutes.includes(pathname);

  if (authenticatedRoute && !userIsAuthenticated) {
    router.push('/login');
    return <LoaderSpinner />;
  }

  const unauthenticatedRoutes = [
    '/register',
    '/verify',
    '/login'
  ];
  const unauthenticatedRoute = pathname && unauthenticatedRoutes.includes(pathname);

  if (unauthenticatedRoute && userIsAuthenticated) {
    router.push('/');
    return <LoaderSpinner />;
  }

  /*const searchRoutes = [
    "/equipments",
    "/ingredients",
    "/products",
    "/recipes"
  ];
  const searchRoute = pathname && searchRoutes.includes(pathname);

  if (!searchRoute ) //dispatch(reset());*/

  return children;
}

type Props = {
  children: ReactElement;
};
