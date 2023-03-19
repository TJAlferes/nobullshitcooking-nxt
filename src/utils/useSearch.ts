'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo }                      from 'react';
import qs                                          from 'qs';

import { getResults, setSuggestions, reset }                                from '../store/search/actions';
import type { SearchRequest }                                               from '../store/search/types';
import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../store';

export function useSearch() {
  const dispatch =     useDispatch();
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  //const term = useSelector(state => state.search.term);

  /*const params = useMemo(() => {
    console.log("useSearch.ts params useMemo, searchParams: ", qs.parse(searchParams.toString()) as SearchRequest);
    return qs.parse(searchParams.toString()) as SearchRequest;  // TO DO: clean searchParams so that it matches SearchRequest
  }, [searchParams]);*/
  const params = qs.parse(searchParams.toString()) as SearchRequest;

  useEffect(() => {
    console.log("useSearch.ts useEffect");
    const anySearchResultsPage = ["/equipments", "/ingredients", "/products", "/recipes"].some(value => value === pathname);
    if (anySearchResultsPage) {
      delete params.filters;
      delete params.sorts;
      params.currentPage = "1";
      params.resultsPerPage = "20";
      search();
    } else {
      dispatch(reset());
    }
  }, [pathname]);

  // maybe make a useEffect for each changed string/array..... in the component

  const search = (term?: string) => {
    if (term) params.term = term;
    // filters
    // sorts
    if (!params.currentPage)    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";
    //dispatch(setTotalPages(1)); ?
    //dispatch(setTotalResults(1)); ?
    dispatch(setSuggestions([]));
    dispatch(getResults(qs.stringify(params), router));
  };

  const addFilter = (filterName: string, filterValue: string) => {
    if (params.filters) {
      if (params.filters[filterName]) params.filters[filterName]?.push(filterValue);
      else                            params.filters[filterName] = [filterValue];
    } else {
      params.filters = {
        [filterName]: [filterValue]
      };
    }
    params.currentPage = "1";
    search();
  };

  const removeFilter = (filterName: string, filterValue: string) => {
    if (!params.filters) return;
    const removed = (params.filters?.[filterName]?.filter(v => v !== filterValue)) as string[];
    params.filters[filterName] = removed;
    params.currentPage = "1";
    search();
  };

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.currentPage = "1";
    search();
  };

  const changeResultsPerPage = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    params.currentPage = "1";
    params.resultsPerPage = `${value}`;
    search();
  };

  const goToPage = (page: number) => {
    params.currentPage = `${page}`;
    search();
  };

  return {
    params,
    search,
    addFilter,
    removeFilter,
    clearFilters,
    changeResultsPerPage,
    goToPage
  };
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
