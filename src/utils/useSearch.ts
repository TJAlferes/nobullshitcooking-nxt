'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter }                    from 'next/router';
import { useMemo }                      from 'react';
import qs                               from 'qs';

import { getResults, setCurrentPage, setResultsPerPage, setSuggestions } from '../store/search/actions';
import type { SearchRequest }                                            from '../store/search/types';
import { useTypedDispatch as useDispatch }                               from '../store';

export function useSearch() {
  const dispatch =     useDispatch();
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  //const params: SearchRequest = Object.fromEntries(searchParams.entries());
  const params = useMemo(() => qs.parse(searchParams.toString()) as SearchRequest, [searchParams]);  // TO DO: clean searchParams so that it matches SearchRequest

  const _search = () => {
    if (!params.currentPage)    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    dispatch(setCurrentPage(params.currentPage));
    dispatch(setResultsPerPage(params.resultsPerPage));

    dispatch(getResults(qs.stringify(params)));
  };

  const goToSearchResults = (index: string, term: string|undefined) => {
    dispatch(setSuggestions([]));
    const idx = index === "equipment" ? "equipments" : index;
    params.term = term ?? "";
    router.push(`/${idx}?${qs.stringify(params)}`);
    _search();
  }

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
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
    _search();
  };

  const removeFilter = (filterName: string, filterValue: string) => {
    if (!params.filters) return;

    const removed = (params.filters?.[filterName]?.filter(v => v !== filterValue)) as string[];
    params.filters[filterName] = removed;

    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
    _search();
  };

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.currentPage = "1";
    router.push(pathname + '?' + qs.stringify(params));
    _search();
  };

  const changeResultsPerPage = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    params.currentPage = "1";
    params.resultsPerPage = `${value}`;
    router.push(pathname + '?' + qs.stringify(params));
    _search();
  };

  const goToPage = (page: number) => {
    params.currentPage = `${page}`;
    router.push(pathname + '?' + qs.stringify(params));
    _search();
  };

  return {
    params,
    goToSearchResults,
    addFilter,
    removeFilter,
    clearFilters,
    changeResultsPerPage,
    goToPage
  };
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
