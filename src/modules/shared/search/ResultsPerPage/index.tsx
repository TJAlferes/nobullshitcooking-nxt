import axios from 'axios';
//import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../../config/api';
import { useSearchState } from '../../../../store';
import { useSearch } from '../hook';
import type { SearchRequest } from '../types';

export function ResultsPerPage() {
  const { router } = useSearch();
  const { found, setFound } = useSearchState();

  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { index } = params;

  const changeResultsPerPage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.current_page     = "1";
    params.results_per_page = `${e.target.value}`;
    
    const search_params = qs.stringify(params);
  
    try {
      const res = await axios
        .get(`${endpoint}/search/find?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
      else setFound({results: [], total_results: 0, total_pages: 0});
    } catch (err) {
      //
    }

    const page = index === 'equipment'
      ? index
      : index.slice(0, index.length - 1);

    router.push({
      pathname: `/${page}/list`,
      query: search_params
    }, undefined, {shallow: true});
  };

  const { total_results } = found;
  if (!total_results || Number(total_results) < 21) return null;

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
}
