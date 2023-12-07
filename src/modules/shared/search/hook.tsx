import axios from 'axios';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../config/api';
import { useSearchState } from '../../../store';
import type { SearchIndex, SearchRequest, SearchResponse } from './types';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const { found, setFound } = useSearchState();

  const search = async (index?: SearchIndex) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    if (!index) params.index = 'recipes';
    else params.index = index;
    if (params.term === '') delete params.term;
    if (!params.current_page) params.current_page = '1';
    if (!params.results_per_page) params.results_per_page = '20';
    
    const search_params = qs.stringify(params);
  
    try {
      const res = await axios.get(`${endpoint}/search/find/?${search_params}`);
        
      if (res.status === 200) setFound(res.data);
    } catch (err) {
      //
    }

    const page = params.index === 'equipment'
      ? params.index
      : params.index.slice(0, params.index.length - 1);

    router.push({
      pathname: `/${page}/list`,
      query: search_params
    });
    //router.push(`/${page}/list?${search_params}`, undefined, {shallow: false});
  };
  
  const setFilters = async (filterName: string, filterValues: string[]) => {
    //const params = qs.parse(searchParams.toString()) as SearchRequest;
    if (params.filters?.[filterName]) {
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
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    params.index = searchIndex;

    if (params.term) delete params.term;
    if (params.term === '') delete params.term;
    if (params.filters) delete params.filters;
    params.filters = {
      [filterName]: filterValues
    };
    //if (params.sorts) delete params.sorts;
    
    params.current_page = '1';
    params.results_per_page = '20';

    const search_params = qs.stringify(params);

    const page = searchIndex === 'equipment'
      ? searchIndex
      : searchIndex.slice(0, searchIndex.length - 1);

    router.push({
      pathname: `/${page}/list`,
      query: search_params
    });
  };

  return {
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
  found: SearchResponse;
  setFound: (found: SearchResponse) => void;
  params: SearchRequest;
  search: (searchIndexChanged?: boolean) => void;
  setFilters: (filterName: string, filterValues: string[]) => void;
  //clearFilters: (filterName: string) => void;
  setPreFilters: (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
};
