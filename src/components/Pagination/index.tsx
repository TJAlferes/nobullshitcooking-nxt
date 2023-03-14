'use client';

import { memo } from 'react';

import { useTypedSelector as useSelector } from '../../store';
import { useSearch }                       from '../../utils/useSearch';

export const Pagination = memo(function Pagination() {
  const { goToPage } = useSearch();

  const currentPage = useSelector(state => state.search.currentPage);
  const totalPages =  useSelector(state => state.search.totalPages);

  if (!totalPages || Number(totalPages) <= 1) return null;

  const curr =  currentPage ? Number(currentPage) : 1;
  const first = 1;
  const prev =  curr - 1;
  const next =  curr + 1;
  const last =  Number(totalPages);

  return (
    <div className="pagination">
      <span>{curr !== first && <button onClick={() => goToPage(first)}>First</button>}</span>
      <span>{curr > 1 &&       <button onClick={() => goToPage(prev)}>Prev</button>}</span>
      <span className="current-page">{curr}</span>
      <span>{curr < last &&    <button onClick={() => goToPage(next)}>Next</button>}</span>
      <span>{curr !== last &&  <button onClick={() => goToPage(last)}>Last</button>}</span>
    </div>
  );
});
