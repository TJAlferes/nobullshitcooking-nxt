import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

import { useSearchState } from '../../../store';
import type { SearchIndex, SearchRequest, SearchResponse } from './types';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const { search_index, setSearchIndex, found, setFound } = useSearchState();

  const search = async (searchIndexChanged?: boolean) => {
    //const params = qs.parse(searchParams.toString()) as SearchRequest;
    console.log('HELLO');
    if (params.term === '') delete params.term;
    if (searchIndexChanged) {
      params.current_page = '1';
      delete params.filters;
    }
    if (!params.current_page) params.current_page = '1';
    if (!params.results_per_page) params.results_per_page = '20';

    const search_params = qs.stringify(params);
    const page = search_index === 'equipment'
      ? search_index
      : search_index.slice(0, search_index.length - 1);

    router.push(`/${page}/list/?${search_params}`);
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

  /*const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.current_page = '1';
    search();
  };*/

  const setPreFilters = (
    searchIndex: SearchIndex,
    filterName: string,
    filterValues: string[]
  ) => {
    //const params = qs.parse(searchParams.toString()) as SearchRequest;  // remove???
    delete params.term;
    params.index = searchIndex;  // TO DO: figure this out
    delete params.filters;
    setFilters(filterName, filterValues);
  };

  return {
    search_index,
    setSearchIndex,
    found,
    setFound,
    params,
    search,
    setFilters,
    //clearFilters,
    setPreFilters
  };
}

export type UseSearch = {
  search_index: SearchIndex;
  setSearchIndex: (search_index: SearchIndex) => void;
  found: SearchResponse;
  setFound: (found: SearchResponse) => void;
  params: SearchRequest;
  search: (searchIndexChanged?: boolean) => void;
  setFilters: (filterName: string, filterValues: string[]) => void;
  //clearFilters: (filterName: string) => void;
  setPreFilters: (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
};
