import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

import { endpoint } from '../../../config/api';
import { useSearchState } from '../../../store';
import { setItem } from '../../general/localStorage';
import type { SearchIndex, SearchRequest } from './types';

// This hook is used by:
// shared/menu                  TO DO: move into general/Layout/Header/LeftNav???
// shared/search/Pagination     (used in */list)
// shared/search/ResultsPerPage (used in */list)
// shared/search/index          (used in general/Layout/Header and recipe/form)
// equipment/list
// ingredient/list
// recipe/list

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const { search_index, setSearchIndex, search_term, setSearchTerm } = useSearchState();

  const search = async (searchIndexChanged?: boolean) => {
    if (searchIndexChanged) delete params.filters;
    //if (search_index) params.index = search_index;
    if (search_term) params.term = search_term;  // TO DO: reset serch_term?  // minLength?
    if (!params.current_page) params.current_page = "1";
    if (!params.results_per_page) params.results_per_page = "20";
    const search_params = qs.stringify(params);
    try {
      const res = await axios.get(`${endpoint}/search/find/${search_index}?${search_params}`);
      setItem('found', res.data);
      const page = search_index === 'equipment'
        ? search_index
        : search_index.slice(0, search_index.length - 1);
      console.log(page);
      router.push(`/${page}/list/?${search_params}`);
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
  };  // used in leftnav menu links

  const clearFilters = (filterName: string) => {
    delete params['filters']?.[filterName];
    params.current_page = "1";
    search();
  };

  return {
    search_index,
    setSearchIndex,
    search_term,
    setSearchTerm,
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
  search_term: string;
  setSearchTerm: (search_term: string) => void;
  params: SearchRequest;
  search: (searchIndexChanged?: boolean, term?: string) => void;
  setFilters: (filterName: string, filterValues: string[]) => void;
  setPreFilters: (searchIndex: SearchIndex, filterName: string, filterValues: string[]) => void;
  clearFilters: (filterName: string) => void;
};  // interface???
