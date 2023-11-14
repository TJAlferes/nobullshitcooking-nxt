import axios from 'axios';
import { memo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../../config/api';
import { setItem } from '../../../general/localStorage';
import type { SearchRequest } from '../state';

export const ResultsPerPage = memo(function ResultsPerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const value = params.results_per_page ? Number(params.results_per_page) : 20;

  const changeResultsPerPage = async (e: SyntheticEvent) => {
    params.current_page     = "1";
    params.results_per_page = `${(e.target as HTMLInputElement).value}`;

    const search_params = qs.stringify(params);
    
    try {
      const response = await axios.get(
        `${endpoint}/search/find/${params.index}?${search_params}`
      );
      setItem('found', response.data);
      router.push(`/${params.index}/list/?${search_params}`);
    } catch (err) {}
  };

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

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
