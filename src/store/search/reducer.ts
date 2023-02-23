import { actionTypes, State, IActions } from './types';

const {
  SET_INDEX,
  SET_TERM,
  SET_FILTERS,
  SET_SORTS,
  SET_CURRENT_PAGE,
  SET_RESULTS_PER_PAGE
} = actionTypes;

const initialState: State = {
  loading:        false,
  index:          "recipes",  // setIndex
  // search request state:
  term:           "",         // setTerm
  filters:        [],         // setFilters (add, remove, clear)
  sorts:          [],         // setSorts   (add, remove, clear)
  currentPage:    1,          // setCurrentPage     // OFFSET in MySQL
  resultsPerPage: 1,          // setResultsPerPage  // LIMIT in MySQL
  // search response state:
  results:        [],
  totalResults:   0,
  startPage:      0,
  endPage:        0,
  totalPages:     0,
  // autosuggest response state:
  suggestions:    []
};

export const searchReducer = (state = initialState, action: IActions): State => {
  switch (action.type) {
    case SET_INDEX:            return {...state, index: action.index};
    case SET_TERM:             return {...state, term: action.term};
    case SET_FILTERS:          return {...state, filters: action.filters};
    case SET_SORTS:            return {...state, sorts: action.sorts};
    case SET_CURRENT_PAGE:     return {...state, currentPage: action.currentPage};
    case SET_RESULTS_PER_PAGE: return {...state, resultsPerPage: action.resultsPerPage};
    default:                   return state;
  }
};
