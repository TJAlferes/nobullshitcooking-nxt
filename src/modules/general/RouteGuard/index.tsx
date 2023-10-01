import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement }      from 'react';

import { useAuth } from '../../../store';
import { LoaderSpinner } from '../../shared/LoaderSpinner';

export function RouteGuard({ children }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const { authname } = useAuth();

  const authenticatedRoutes = [
    '/dashboard',
    '/friends',
    '/chat',
    '/equipment/form',
    '/ingredients/form',
    '/recipes/form',
    '/plans/form',
    '/chatgroups/form'
  ];
  const authenticatedRoute = authenticatedRoutes.includes(pathname);
  const unauthenticated = authname === "";
  if (authenticatedRoute && unauthenticated) {
    router.push('/login');
    return <LoaderSpinner />;
  }

  const unauthenticatedRoutes = ['/register', '/confirm', '/login'];
  const unauthenticatedRoute = unauthenticatedRoutes.includes(pathname);
  const authenticated = authname !== "";
  if (unauthenticatedRoute && authenticated) {
    router.push('/');
    return <LoaderSpinner />;
  }

  return children;
}

type Props = {
  children: ReactElement;
};
