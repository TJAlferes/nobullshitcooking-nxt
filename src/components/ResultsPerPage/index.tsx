'use client';

import { memo } from 'react';

import { useTypedSelector as useSelector } from '../../store';
import { useSearch }                       from '../../utils/useSearch';

export function ResultsPerPage() {
  const { changeResultsPerPage } = useSearch();

  const resultsPerPage = useSelector(state => state.search.resultsPerPage);
  console.log('>>>resultsPerPage: ', resultsPerPage);

  return (
    <div className="results-per-page">
      <label>Results per page:</label>
      <select onChange={changeResultsPerPage} value={resultsPerPage ? Number(resultsPerPage) : 20}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
