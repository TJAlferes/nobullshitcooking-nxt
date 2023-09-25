'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement }      from 'react';

import { useAuthname }   from '../../auth';
import { LoaderSpinner } from '../../shared/LoaderSpinner';

export function RouteGuard({ children }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const authname = useAuthname();

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

  if (authenticatedRoute && !authname) {
    router.push('/login');
    return <LoaderSpinner />;
  }

  const unauthenticatedRoutes = [
    '/register',
    '/verify',
    '/login'
  ];
  const unauthenticatedRoute = pathname && unauthenticatedRoutes.includes(pathname);

  if (unauthenticatedRoute && authname) {
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
