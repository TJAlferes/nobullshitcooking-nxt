import type { useRouter } from 'next/navigation';

import { actionTypes, SearchIndex, Suggestion, SearchResponse, FilterKey, SortDirection } from './types';

const {
  RESET,
  SET_INDEX,
  SET_TERM,
  SET_FILTERS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_SORTS,
  SET_CURRENT_PAGE,
  SET_RESULTS_PER_PAGE,
  GET_RESULTS,
  GET_SUGGESTIONS,
  SET_RESULTS,
  SET_SUGGESTIONS
} = actionTypes;

export const reset =             () =>                                      ({type: RESET});
export const setIndex =          (index: SearchIndex) =>                    ({type: SET_INDEX, index});
export const setTerm =           (term: string) =>                          ({type: SET_TERM, term});
export const setFilters =        (key: FilterKey, values: string[]) =>      ({type: SET_FILTERS, key, values});
export const addFilter =         (key: FilterKey, value: string) =>         ({type: ADD_FILTER, key, value});
export const removeFilter =      (key: FilterKey, value: string) =>         ({type: REMOVE_FILTER, key, value});
export const setSorts =          (col: string, direction: SortDirection) => ({type: SET_SORTS, col, direction});
export const setCurrentPage =    (currentPage: string) =>                   ({type: SET_CURRENT_PAGE, currentPage});
export const setResultsPerPage = (resultsPerPage: string) =>                ({type: SET_RESULTS_PER_PAGE, resultsPerPage});

export const getResults =        (searchParams: string, router: ReturnType<typeof useRouter>) => ({type: GET_RESULTS, searchParams, router});
export const getSuggestions =    (term: string) =>                                               ({type: GET_SUGGESTIONS, term});

export const setResults =        (found: SearchResponse) =>                 ({type: SET_RESULTS, found});
export const setSuggestions =    (suggestions: Suggestion[]) =>             ({type: SET_SUGGESTIONS, suggestions});
