'use client';

import { memo, useContext } from 'react';

import { SearchContext } from '../../utils/SearchProvider';

export const ResultsPerPage = memo(function ResultsPerPage() {
  const searchDriver = useContext(SearchContext);

  const resultsPerPage = searchDriver.params.resultsPerPage; 
  const value = resultsPerPage ? Number(resultsPerPage) : 20;

  return (
    <div className="results-per-page">
      <label>Results per page:</label>
      <select onChange={searchDriver.changeResultsPerPage} value={value}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
});
