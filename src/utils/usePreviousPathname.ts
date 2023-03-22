'use client';

import { usePathname }       from 'next/navigation';
import { useEffect, useRef } from 'react';

export function usePreviousPathname() {
  const pathname = usePathname();

  const ref = useRef<string|null>(null);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  return ref.current;
};
