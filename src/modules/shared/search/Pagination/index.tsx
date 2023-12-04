//import axios from 'axios';
import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import qs from 'qs';

//import { endpoint } from '../../../../config/api';
//import { useSearchState } from '../../../../store';
import type { SearchIndex, SearchRequest } from '../types';

// TO DO: change button to Link, have goToPage return the ``
export const Pagination = memo(function Pagination({
  search_index,
  total_pages
}: {
  search_index: SearchIndex;
  total_pages: number | string;
}) {
  if (!total_pages || Number(total_pages) < 2) return null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const goToPage = async (pageNumber: number) => {
    params.current_page = `${pageNumber}`;
    
    try {
      // only do these in the list pages...
      //const res
      //  = await axios.get(`${endpoint}/search/find/${search_index}?${search_params}`);
      //if (res.status === 200) setFound(res.data);

      // these still do here?
      const nextjsPage = search_index === 'equipment'
        ? search_index
        : search_index.slice(0, search_index.length - 1);

      //router.push(`/${nextjsPage}/list/?${qs.stringify(params)}`);
      router.push({
        pathname: `/${nextjsPage}/list`,
        query: qs.stringify(params),
      });
    } catch (err) {
      //
    }
  };

  const current_page = params.current_page ? params.current_page : "1";

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
});
