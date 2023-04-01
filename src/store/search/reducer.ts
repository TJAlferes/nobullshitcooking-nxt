import { actionTypes, State, Actions } from './types';

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
  SET_RESULTS,
  SET_SUGGESTIONS
} = actionTypes;

const initialState: State = {
  loading:        false,
  index:          "recipes",
  // search request state:
  term:           "",
  filters:        {
    equipmentTypes:    [],
    ingredientTypes:   [],
    recipeTypes:       [],
    methods:           [],
    cuisines:          [],
    productCategories: [],
    productTypes:      []
  },
  sorts:          {},
  currentPage:    "1",
  resultsPerPage: "20",
  // search response state:
  //resultTerm:     "",
  results:        [],
  totalResults:   0,
  totalPages:     0,
  // autosuggest response state:
  suggestions:    []
};

export const searchReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case RESET:                return {...state, ...initialState};
    case SET_INDEX:            return {...state, index: action.index};
    case SET_TERM:             return {...state, term: action.term};
    case SET_FILTERS: return {
      ...state,
      filters: {
        ...state.filters,
        [action.key]: action.values
      }
    };
    case ADD_FILTER: {
      const values = state.filters?.[action.key];
      if (values === undefined) return state;
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: [
            ...(values),
            action.value
          ]
        }
      };
    };
    case REMOVE_FILTER: {
      const values = state.filters?.[action.key];
      if (values === undefined) return state;
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: values.filter(v => v !== action.value)
        }
      };
    };
    case SET_SORTS:            return {...state, sorts: {...state.sorts, [action.col]: action.direction}};
    case SET_CURRENT_PAGE:     return {...state, currentPage: action.currentPage};
    case SET_RESULTS_PER_PAGE: return {...state, resultsPerPage: action.resultsPerPage};
    case SET_RESULTS:          return {
      ...state,
      //termResult: action.found.termResult,
      results:      action.found.results,
      totalResults: action.found.totalResults,
      totalPages:   action.found.totalPages
    };
    case SET_SUGGESTIONS:      return {...state, suggestions: action.suggestions};
    default:                   return state;
  }
};
