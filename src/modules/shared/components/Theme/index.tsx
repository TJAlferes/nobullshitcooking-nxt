import type { ReactNode } from 'react';

import { useTypedSelector as useSelector } from '../../store';

export function Theme({ children }: Props) {
  const theme = useSelector(state => state.theme.theme);

  return <div className={`${theme} theme`}>{children}</div>;
};

type Props = {
  children?: ReactNode;
};
