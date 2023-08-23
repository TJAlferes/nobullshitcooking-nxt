'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useMemo }     from 'react';
import type { ReactNode }             from 'react';
import qs                             from 'qs';

import { useTypedDispatch as useDispatch }               from '../../../redux';
import { toggleLeftNav }                                 from '../menu/state';
import { getResults, setIndex, setSuggestions, setTerm } from './state';
import type { SearchIndex, SearchRequest }               from './state';

export const SearchContext = createContext({} as UseSearch);

export function SearchProvider({ children }: SearchProviderProps) {
  const searchDriver = useSearch();

  return (
    <SearchContext.Provider value={searchDriver}>
      {children}
    </SearchContext.Provider>
  );
}

type SearchProviderProps = {
  children: ReactNode;
};

function useSearch() {
  const dispatch     = useDispatch();
  const router       = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString()) as SearchRequest;  // TO DO: clean searchParams so that it matches SearchRequest
  }, [searchParams]);

  const search = (searchIndexChanged?: boolean, term?: string) => {
    if (searchIndexChanged)       delete params.filters;
    if (term)                     params.term             = term;
    if (!params.current_page)     params.current_page     = "1";
    if (!params.results_per_page) params.results_per_page = "20";
    dispatch(setSuggestions([]));
    dispatch(getResults(qs.stringify(params), router));
  };

  const setFilters = (filterName: string, filterValues: string[]) => {
    if (params.filters) {
      if (filterValues.length > 0) {
        params.filters[filterName] = filterValues;
      } else {
        delete params.filters[filterName];
      }
    } else {
      if (filterValues.length > 0) {
        params.filters = {
          [filterName]: filterValues
        };
      }
    }
    params.current_page = "1";
    search();
  };

  const setPreFilters = (
    searchIndex:  SearchIndex,
    filterName:   string,
    filterValues: string[]
  ) => {
    dispatch(setTerm(""));
    delete params.term;
    dispatch(setIndex(searchIndex));
    dispatch(toggleLeftNav());
    delete params.filters;
    setFilters(filterName, filterValues);
  };

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.current_page = "1";
    search();
  };

  const changeResultsPerPage = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    params.current_page = "1";
    params.results_per_page = `${value}`;
    search();
  };

  const goToPage = (page: number) => {
    params.current_page = `${page}`;
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

export type UseSearch = {
  params:               SearchRequest;
  search:               (searchIndexChanged?: boolean, term?: string) =>                          void;
  setFilters:           (filterName: string, filterValues: string[]) =>                           void;
  setPreFilters:        (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
  clearFilters:         (filterName: string) =>                                                   void;
  changeResultsPerPage: (e: SyntheticEvent) =>                                                    void;
  goToPage:             (page: number) =>                                                         void;
};  // interface???

//console.log("previousPathname: ", previousPathname);
//console.log("comingFromSearchResultsPage: ", comingFromSearchResultsPage);

/*function usePreviousPathname() {
  const pathname = usePathname();

  const ref = useRef<string|null>(null);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  return ref.current;
};*/

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
