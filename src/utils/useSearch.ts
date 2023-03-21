'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo }                      from 'react';
import qs                                          from 'qs';

import { getResults, setIndex, setSuggestions } from '../store/search/actions';
import { toggleLeftNav }                        from '../store/menu/actions';
import type { SearchIndex, SearchRequest }      from '../store/search/types';
import { useTypedDispatch as useDispatch }      from '../store';

// maybe move this so there is only one instance of this in the whole app... and then just share the return value object as a react context
export function useSearch() {
  const dispatch =     useDispatch();
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString()) as SearchRequest;  // TO DO: clean searchParams so that it matches SearchRequest
  }, [searchParams]);
  //const params = qs.parse(searchParams.toString()) as SearchRequest;

  useEffect(() => {
    const searchResultsPage = ["/equipments", "/ingredients", "/products", "/recipes"].includes(pathname);
    if (searchResultsPage) {
      params.currentPage = "1";
      params.resultsPerPage = "20";
      search();
    }
  }, [pathname]);

  const search = (term?: string) => {
    if (term)                   params.term = term;
    if (!params.currentPage)    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";
    dispatch(setSuggestions([]));
    dispatch(getResults(qs.stringify(params), router));
  };

  const setFilters = (filterName: string, filterValues: string[]) => {
    if (params.filters) {
      params.filters[filterName] = filterValues;
    } else {
      params.filters = {
        [filterName]: filterValues
      };
    }
    params.currentPage = "1";
    search();
  };

  const setPreFilters = (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => {
    dispatch(setIndex(searchIndex));
    dispatch(toggleLeftNav());
    delete params.filters;
    setFilters(filterName, filterValues);
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
    setFilters,
    setPreFilters,
    clearFilters,
    changeResultsPerPage,
    goToPage
  };
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

/*const addFilter = (filterName: string, filterValue: string) => {
    if (params.filters) {
      if (params.filters[filterName]) {
        if (params.filters[filterName]?.includes(filterValue)) return;
        params.filters[filterName]?.push(filterValue);
      } else {
        params.filters[filterName] = [filterValue];
      }
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
    if (!params.filters[filterName]) return;
    if (!params.filters[filterName]?.includes(filterValue)) return;
    const removed = (params.filters?.[filterName]?.filter(v => v !== filterValue)) as string[];
    if (removed.length) params.filters[filterName] = removed;
    else delete params.filters[filterName];
    params.currentPage = "1";
    search();
  };*/

  /*addFilter,
    removeFilter,*/
