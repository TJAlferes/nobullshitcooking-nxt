import axios from 'axios';
//import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
//import { useRouter } from 'next/router';
import qs from 'qs';

import { endpoint } from '../../../../config/api';
import { useSearchState } from '../../../../store';
import { useSearch } from '../hook';
import type { SearchRequest } from '../types';

export function Pagination() {
  //const router = useRouter();
  const { router } = useSearch();
  const { found, setFound } = useSearchState();

  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { index } = params;

  const goToPage = async (pageNumber: number) => {
    params.current_page = `${pageNumber}`;

    const search_params = qs.stringify(params);
  
    try {
      const res = await axios
        .get(`${endpoint}/search/find?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
      else setFound({results: [], total_results: 0, total_pages: 0});
    } catch (err) {
      //
    }

    const nextjsPage = index === 'equipment'
      ? index
      : index.slice(0, index.length - 1);

    router.push({
      pathname: `/${nextjsPage}/list`,
      query: search_params
    }, undefined, {shallow: true});
  };

  const current_page = params.current_page ? params.current_page : "1";
  const { total_pages } = found;
  if (!total_pages || Number(total_pages) < 2) return null;

  const curr  = current_page ? Number(current_page) : 1;
  const first = 1;
  const prev  = curr - 1;
  const next  = curr + 1;
  const last  = Number(total_pages);

  return (
    <div className="pagination">
      <span>
        {curr !== first
          ? <button onClick={() => goToPage(first)}>First</button>
          : false}
      </span>

      <span>
        {curr > 1
          ? <button onClick={() => goToPage(prev)}>Prev</button>
          : false}
      </span>

      <span className="current-page">{curr}</span>

      <span>
        {curr < last
          ? <button onClick={() => goToPage(next)}>Next</button>
          : false}
      </span>

      <span>
        {curr !== last
          ? <button onClick={() => goToPage(last)}>Last</button>
          : false}
      </span>
    </div>
  );
}
