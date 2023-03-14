'use client';

import { memo } from 'react';

import { useTypedSelector as useSelector } from '../../store';
import { useSearch }                       from '../../utils/useSearch';

export const ResultsPerPage = memo(function ResultsPerPage() {
  const { changeResultsPerPage } = useSearch();

  const resultsPerPage = useSelector(state => state.search.resultsPerPage);
  const value = resultsPerPage ? Number(resultsPerPage) : 20;

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
