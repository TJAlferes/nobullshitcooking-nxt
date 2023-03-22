'use client';

import { memo, useContext } from 'react';

import { useTypedSelector as useSelector } from '../../store';
import { SearchContext }                   from '../../utils/SearchProvider';

export const Pagination = memo(function Pagination() {
  const searchDriver = useContext(SearchContext);

  const currentPage = searchDriver.params.currentPage;
  const totalPages =  useSelector(state => state.search.totalPages);

  if (!totalPages || Number(totalPages) <= 1) return null;

  const curr =  currentPage ? Number(currentPage) : 1;
  const first = 1;
  const prev =  curr - 1;
  const next =  curr + 1;
  const last =  Number(totalPages);

  return (
    <div className="pagination">
      <span>{curr !== first && <button onClick={() => searchDriver.goToPage(first)}>First</button>}</span>
      <span>{curr > 1 &&       <button onClick={() => searchDriver.goToPage(prev)}>Prev</button>}</span>
      <span className="current-page">{curr}</span>
      <span>{curr < last &&    <button onClick={() => searchDriver.goToPage(next)}>Next</button>}</span>
      <span>{curr !== last &&  <button onClick={() => searchDriver.goToPage(last)}>Last</button>}</span>
    </div>
  );
});
