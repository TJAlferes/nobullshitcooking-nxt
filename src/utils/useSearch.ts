'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect }                               from 'react';
import qs                                          from 'qs';

import { getResults, setCurrentPage, setResultsPerPage }                      from '../store/search/actions';
import type { SearchRequest }              from '../store/search/types';
import { useTypedDispatch as useDispatch } from '../store';

export function useSearch() {
  const dispatch =     useDispatch();
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  useEffect(() => {
    //const params: SearchRequest = Object.fromEntries(searchParams.entries());
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (!params.currentPage)    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    dispatch(setCurrentPage(params.currentPage));
    dispatch(setResultsPerPage(params.resultsPerPage));

    dispatch(getResults(qs.stringify(params)));
  }, [searchParams]);

  const addFilter = (filterName: string, filterValue: string) => {
    // TO DO: clean searchParams so that it matches SearchRequest
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (params.filters) {
      if (params.filters[filterName]) params.filters[filterName]?.push(filterValue);
      else                            params.filters[filterName] = [filterValue];
    } else {
      params.filters = {
        [filterName]: [filterValue]
      };
    }
    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const removeFilter = (filterName: string, filterValue: string) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (!params.filters) return;

    const removed = (params.filters?.[filterName]?.filter(v => v !== filterValue)) as string[];
    params.filters[filterName] = removed;

    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const clearFilters = (filterName: string) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    delete params['filters']?.[filterName];
    params.currentPage = "1";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const changeResultsPerPage = (e: SyntheticEvent) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    const value = (e.target as HTMLInputElement).value;

    params.currentPage = "1";
    params.resultsPerPage = `${value}`;

    router.push(pathname + '?' + qs.stringify(params));
  };

  const goToPage = (page: number) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    params.currentPage = `${page}`;
    router.push(pathname + '?' + qs.stringify(params));
  };

  return {
    params,
    addFilter,
    removeFilter,
    clearFilters,
    changeResultsPerPage,
    goToPage
  };
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
