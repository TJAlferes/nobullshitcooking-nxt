import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

import { useAuth } from '../../../store';

export function RouteGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { authname } = useAuth();

  useEffect(() => {
    const authenticatedRoutes = [
      '/dashboard',
      '/friends',
      '/chat',
      '/private-equipment/form',
      '/private-ingredient/form',
      '/private-recipe/form',
      '/public-recipe/form',
      '/private-plan/form',
      '/public-plan/form',
      '/chatgroup/form'
    ];
    const authenticatedRoute = authenticatedRoutes.includes(pathname);
    const unauthenticated = authname === "";
    if (authenticatedRoute && unauthenticated) {
      router.push('/login');
    }

    const unauthenticatedRoutes = [
      '/register',
      '/confirm',
      '/resend-confirmation-code',
      '/login',
      '/forgot-password'
    ];
    const unauthenticatedRoute = unauthenticatedRoutes.includes(pathname);
    const authenticated = authname !== "";
    if (unauthenticatedRoute && authenticated) {
      router.push('/');
    }
  }, [pathname]);

  return children;
}

type Props = {
  children: ReactElement;
};
