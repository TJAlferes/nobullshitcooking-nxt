//import axios from 'axios';
import { memo } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

//import { endpoint } from '../../../../config/api';
//import { useSearchState } from '../../../../store';
import type { SearchRequest } from '../types';

// TO DO: change button to Link, have goToPage return the ``
export const ResultsPerPage = memo(function ResultsPerPage({
  search_index
}: {
  search_index: string;
}) {
  const router = useRouter();

  const params: SearchRequest = router.query;

  const changeResultsPerPage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.current_page     = "1";
    params.results_per_page = `${e.target.value}`;
    
    try {
      // only do these in the list pages...
      //const res
      //  = await axios.get(`${endpoint}/search/find/${search_index}?${search_params}`);
      //if (res.status === 200) setFound(res.data);

      // these still do here?
      const page = search_index === 'equipment'
        ? search_index
        : search_index.slice(0, search_index.length - 1);

      //router.push(`/${page}/list/?${qs.stringify(params)}`);
      router.push({
        pathname: `/${page}/list`,
        query: qs.stringify(params),
      });
    } catch (err) {
      //
    }
  };

  const value = params.results_per_page ? Number(params.results_per_page) : 20;

  return (
    <div className="results-per-page">
      <label>Results per page:</label>
      <select onChange={changeResultsPerPage} value={value}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
});
