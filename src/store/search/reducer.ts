import { actionTypes, State, IActions } from './types';

const {
  RESET,
  SET_INDEX,
  SET_TERM,
  SET_FILTERS,
  SET_SORTS,
  SET_CURRENT_PAGE,
  SET_RESULTS_PER_PAGE,
  GET_RESULTS,
  GET_SUGGESTIONS
} = actionTypes;

const initialState: State = {
  loading:        false,
  index:          "recipes",  // setIndex
  // search request state:
  term:           "",         // setTerm
  filters:        {
    equipmentTypes:    [],
    ingredientTypes:   [],
    recipeTypes:       [],
    methods:           [],
    cuisines:          [],
    productCategories: [],
    productTypes:      []
  },                   // setFilters (add, remove, clear)
  sorts:          {},  // setSorts   (add, remove, clear)
  currentPage:    1,   // setCurrentPage     // OFFSET in MySQL
  resultsPerPage: 1,   // setResultsPerPage  // LIMIT in MySQL
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
    case RESET:                return {...state, ...initialState};
    case SET_INDEX:            return {...state, index: action.index};
    case SET_TERM:             return {...state, term: action.term};
    case SET_FILTERS:          return {...state, filters: {...state.filters, [action.key]: action.values}};
    case SET_SORTS:            return {...state, sorts: {...state.sorts, [action.col]: action.direction}};
    case SET_CURRENT_PAGE:     return {...state, currentPage: action.currentPage};
    case SET_RESULTS_PER_PAGE: return {...state, resultsPerPage: action.resultsPerPage};
    case GET_RESULTS:          return {
      ...state,
      results:      action.found.results,
      totalResults: action.found.totalResults,
      startPage:    action.found.startPage,
      endPage:      action.found.endPage,
      totalPages:   action.found.totalPages
    };
    case GET_SUGGESTIONS:      return {...state, suggestions: action.suggestions};
    default:                   return state;
  }
};
