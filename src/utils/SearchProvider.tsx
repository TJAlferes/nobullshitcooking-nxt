'use client';

import { useRouter, usePathname, useSearchParams }   from 'next/navigation';
import { createContext, useEffect, useMemo, useRef } from 'react';
import type { ReactNode }                            from 'react';
import qs                                            from 'qs';

import { getResults, setIndex, setSuggestions } from '../store/search/actions';
import { toggleLeftNav }                        from '../store/menu/actions';
import type { SearchIndex, SearchRequest }      from '../store/search/types';
import { useTypedDispatch as useDispatch }      from '../store';

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

function usePreviousPathname() {
  const pathname = usePathname();

  const ref = useRef<string|null>(null);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  return ref.current;
};

function useSearch() {
  const dispatch =     useDispatch();
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const previousPathname = usePreviousPathname();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString()) as SearchRequest;  // TO DO: clean searchParams so that it matches SearchRequest
  }, [searchParams]);

  useEffect(() => {
    const goingToSearchResultsPage = ["/equipments", "/ingredients", "/products", "/recipes"].includes(pathname);
    if (goingToSearchResultsPage) {
      //console.log("previousPathname: ", previousPathname);
      const comingFromSearchResultsPage = (previousPathname && ["/equipments", "/ingredients", "/products", "/recipes"].includes(previousPathname)) as boolean;
      //console.log("comingFromSearchResultsPage: ", comingFromSearchResultsPage);
      if (comingFromSearchResultsPage) delete params.filters;  // FIX HERE: move/change/remove this

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

export type UseSearch = {
  params:               SearchRequest;
  search:               (term?: string) =>                                                        void;
  setFilters:           (filterName: string, filterValues: string[]) =>                           void;
  setPreFilters:        (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
  clearFilters:         (filterName: string) =>                                                   void;
  changeResultsPerPage: (e: SyntheticEvent) =>                                                    void;
  goToPage:             (page: number) =>                                                         void;
};

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
