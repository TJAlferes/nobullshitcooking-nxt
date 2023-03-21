import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement }      from 'react';

import { useTypedSelector as useSelector } from '../../../store';
import { LoaderSpinner }                   from '../..';

export function Guard({ children }: Props) {
  const router =   useRouter();
  const pathname = usePathname();
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

  const searchRoutes = [
    "/equipments",
    "/ingredients",
    "/products",
    "/recipes"
  ];
  const searchRoute = pathname && searchRoutes.includes(pathname);

  if ( (typeof window !== "undefined") && !searchRoute ) {
    //dispatch(reset());
  }

  /*useEffect(() => {
    const anySearchResultsPage = ["/equipments", "/ingredients", "/products", "/recipes"].some(value => value === pathname);
    if (anySearchResultsPage) {
      delete params.filters;
      delete params.sorts;
      params.currentPage = "1";
      params.resultsPerPage = "20";
      search();
    } else {
      //dispatch(reset());  // ?
    }
  }, [pathname]);*/

  return children;
}

type Props = {
  children: ReactElement;
};