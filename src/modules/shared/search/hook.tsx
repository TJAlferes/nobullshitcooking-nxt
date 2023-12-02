import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../config/api';
import { useSearchState } from '../../../store';
import type { SearchIndex, SearchRequest, SearchResponse } from './types';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const { search_index, setSearchIndex, found, setFound } = useSearchState();

  const search = async (searchIndexChanged?: boolean) => {
    if (params.term === '') delete params.term;

    if (searchIndexChanged) {
      params.current_page = '1';
      delete params.filters;
    }
    
    if (!params.current_page) params.current_page = '1';

    if (!params.results_per_page) params.results_per_page = '20';

    const search_params = qs.stringify(params);

    try {
      const res = await axios
        .get(`${endpoint}/search/find/${search_index}?${search_params}`);

      if (res.status === 200) setFound(res.data);

      const page = search_index === 'equipment'
        ? search_index
        : search_index.slice(0, search_index.length - 1);

      router.push(`/${page}/list/?${search_params}`);
    } catch (err) {
      //
    }
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

    params.current_page = '1';

    search();
  };

  const setPreFilters = (
    searchIndex:  SearchIndex,
    filterName:   string,
    filterValues: string[]
  ) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;  // remove???
    delete params.term;
    params.index = searchIndex;  // TO DO: figure this out
    delete params.filters;
    setFilters(filterName, filterValues);
  };

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.current_page = '1';
    search();
  };

  return {
    search_index,
    setSearchIndex,
    found,
    params,
    search,
    setFilters,
    setPreFilters,
    clearFilters
  };
}

export type UseSearch = {
  search_index: SearchIndex;
  setSearchIndex: (search_index: SearchIndex) => void;
  found: SearchResponse;
  params: SearchRequest;
  search: (searchIndexChanged?: boolean) => void;
  setFilters: (filterName: string, filterValues: string[]) => void;
  setPreFilters: (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
  clearFilters: (filterName: string) => void;
};
