'use client';

import { memo, useContext } from 'react';

import { useTypedSelector as useSelector } from '../../store';
import { SearchContext }                   from '../../utils/SearchProvider';

export const Pagination = memo(function Pagination() {
  const searchDriver = useContext(SearchContext);

  const current_page = searchDriver.params.current_page;
  const total_pages =  useSelector(state => state.search.total_pages);

  if (!total_pages || Number(total_pages) <= 1) return null;

  const curr =  current_page ? Number(current_page) : 1;
  const first = 1;
  const prev =  curr - 1;
  const next =  curr + 1;
  const last =  Number(total_pages);

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
