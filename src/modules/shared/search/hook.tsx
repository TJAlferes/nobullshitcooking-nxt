import axios from 'axios';
import { useRouter } from 'next/router';
//import type { NextRouter } from 'next/router';
import qs from 'qs';

import { endpoint } from '../../../config/api';
import { useSearchState } from '../../../store';
import type { SearchIndex, SearchRequest, SearchResponse } from './types';

export function useSearch() {
  const router = useRouter();

  const params: SearchRequest = router.query;

  const { search_index, setSearchIndex, found, setFound } = useSearchState();

  const search = async (searchIndexChanged?: boolean) => {
    const params: SearchRequest = router.query;  //
    if (params.term === '') delete params.term;
    if (searchIndexChanged) {
      params.current_page = '1';
      delete params.filters;
    }
    if (!params.current_page) params.current_page = '1';
    if (!params.results_per_page) params.results_per_page = '20';
    
    const page = search_index === 'equipment'
      ? search_index
      : search_index.slice(0, search_index.length - 1);
    
    const search_params = qs.stringify(params);
    console.log('search_params: ', search_params);
  
    try {
      const res = await axios
        .get(`${endpoint}/search/find/${search_index}?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
    } catch (err) {
      //
    }

    //router.push(`/${page}/list/?${search_params}`);
    router.push({
      pathname: `/${page}/list`,
      query: search_params,
    });
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
    //params.index = searchIndex;  // TO DO: figure this out
    delete params.filters;
    setFilters(filterName, filterValues);
  };

  return {
    //router,  // do they need the same router instance?
    search_index,
    setSearchIndex,
    found,
    setFound,
    params,  // do they need the same params object?
    search,
    setFilters,
    //clearFilters,
    setPreFilters
  };
}

export type UseSearch = {
  //router: NextRouter;
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
