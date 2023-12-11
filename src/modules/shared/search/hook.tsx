import axios from 'axios';
import type { NextRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../config/api';
import { useRouter, useSearchState } from '../../../store';
import type { SearchIndex, SearchRequest, SearchResponse } from './types';

export function useSearch() {
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const router = useRouter();
  const { found, setFound } = useSearchState();

  const search = async (index?: SearchIndex) => {
    if (!index) params.index = 'recipes';
    else params.index = index;
    if (params.term === '') delete params.term;
    if (!params.current_page) params.current_page = '1';
    if (!params.results_per_page) params.results_per_page = '20';
    
    const search_params = qs.stringify(params);
  
    try {
      const res = await axios.get(`${endpoint}/search/find/?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
      else setFound({results: [], total_results: 0, total_pages: 0});
    } catch (err) {
      //
    }

    const page = params.index === 'equipment'
      ? params.index
      : params.index.slice(0, params.index.length - 1);
    
    router.push({
      pathname: `/${page}/list`,
      query: search_params
    }, undefined, {shallow: true});
  };
  
  const setFilters = async (filterName: string, filterValues: string[]) => {
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

    search(params.index);
  };

  /*const clearFilters = () => {
    delete params.filters;
  };*/

  const setPreFilters = async (
    searchIndex: SearchIndex,
    filterName: string,
    filterValues: string[]
  ) => {
    params.index = searchIndex;

    if (params.term) delete params.term;
    if (params.term === '') delete params.term;
    if (params.filters) delete params.filters;
    //setFilters(filterName, filterValues);

    params.filters = {
      [filterName]: filterValues
    };
    //if (params.sorts) delete params.sorts;
    
    params.current_page = '1';
    params.results_per_page = '20';

    const search_params = qs.stringify(params);

    try {
      const res = await axios.get(`${endpoint}/search/find/?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
      else setFound({results: [], total_results: 0, total_pages: 0});
    } catch (err) {
      //
    }

    const page = searchIndex === 'equipment'
      ? searchIndex
      : searchIndex.slice(0, searchIndex.length - 1);

    router.push({
      pathname: `/${page}/list`,
      query: search_params
    }, undefined, {shallow: true});
  };

  return {
    router,
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
  router: NextRouter;
  found: SearchResponse;
  setFound: (found: SearchResponse) => void;
  params: SearchRequest;
  search: (searchIndexChanged?: boolean) => void;
  setFilters: (filterName: string, filterValues: string[]) => void;
  //clearFilters: (filterName: string) => void;
  setPreFilters: (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
};
