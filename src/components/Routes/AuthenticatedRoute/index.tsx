import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { LoaderSpinner } from '../../index';
import { useTypedSelector as useSelector } from '../../../store';

export function AuthenticatedRoute({ children }: Props) {
  const { push } = useRouter();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  useEffect(() => {
    if (!userIsAuthenticated) push('/');
  }, [userIsAuthenticated]);

  return (!userIsAuthenticated) ? <LoaderSpinner /> : children;
}

type Props = {
  children: ReactElement;
};