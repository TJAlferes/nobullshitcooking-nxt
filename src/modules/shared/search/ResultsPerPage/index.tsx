'use client';

import { memo, useContext } from 'react';

import { SearchContext } from '../hook';

export const ResultsPerPage = memo(function ResultsPerPage() {
  const searchDriver = useContext(SearchContext);

  const results_per_page = searchDriver.params.results_per_page;

  const value = results_per_page ? Number(results_per_page) : 20;

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
