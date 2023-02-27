import { actionTypes, SearchIndex, SearchResponse, FilterKey, SortDirection } from './types';

const {
  RESET,

  SET_INDEX,

  SET_TERM,
  SET_FILTERS,
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
export const setSorts =          (col: string, direction: SortDirection) => ({type: SET_SORTS, col, direction});
export const setCurrentPage =    (currentPage: number) =>                   ({type: SET_CURRENT_PAGE, currentPage});
export const setResultsPerPage = (resultsPerPage: number) =>                ({type: SET_RESULTS_PER_PAGE, resultsPerPage});
export const getResults =        () =>                                      ({type: GET_RESULTS});
export const getSuggestions =    () =>                                      ({type: GET_SUGGESTIONS});
export const setResults =        (found: SearchResponse) =>                 ({type: SET_RESULTS, found});
export const setSuggestions =    (suggestions: any[]) =>                    ({type: SET_SUGGESTIONS, suggestions});
