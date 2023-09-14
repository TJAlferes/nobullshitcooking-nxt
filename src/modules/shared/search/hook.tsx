import axios                          from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo }                    from 'react';
import qs                             from 'qs';

import { endpoint }                        from '../../../config/api';
import { setItem }                         from '../../general/localStorage';
import type { SearchIndex, SearchRequest } from './state';

// WHY IS THIS CONTEXT EVEN NEEDED?
// JUST READ STATE STRAIGHT FROM URL, WRITE STATE STRAIGHT TO URL

// general/Layout/Header/Search
// shared/menu                   move into general/Layout/Header/LeftNav???
// equipment/list
// ingredient/list
// recipe/list

export function useSearch() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString()) as SearchRequest;  // TO DO: clean searchParams so that it matches SearchRequest
  }, [searchParams]);

  const search = async (searchIndexChanged?: boolean, term?: string) => {
    if (searchIndexChanged)       delete params.filters;
    if (term)                     params.term             = term;
    if (!params.current_page)     params.current_page     = "1";
    if (!params.results_per_page) params.results_per_page = "20";
    //await delay(250);  // debounce
    const search_params = qs.stringify(params);
    const { index } = params;
    try {
      const response = await axios.get(
        `${endpoint}/search/find/${index}?${search_params}`
      );
      setItem('found', response.data);
      router.push(`/${index}/list/?${search_params}`);
    } catch (err) {}
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
    delete params.term;
    params.index = searchIndex;  // move???
    delete params.filters;
    setFilters(filterName, filterValues);
  };  // used in leftnav links

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.current_page = "1";
    search();
  };

  return {
    params,
    search,
    setFilters,
    setPreFilters,
    clearFilters
  };
}

export type UseSearch = {
  params:               SearchRequest;
  search:               (searchIndexChanged?: boolean, term?: string) =>                          void;
  setFilters:           (filterName: string, filterValues: string[]) =>                           void;
  setPreFilters:        (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
  clearFilters:         (filterName: string) =>                                                   void;
};  // interface???
