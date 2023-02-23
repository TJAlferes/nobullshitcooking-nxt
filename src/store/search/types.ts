export const actionTypes = {
  RESET:                'RESET',
  SET_INDEX:            'SET_INDEX',
  SET_TERM:             'SET_TERM',
  SET_FILTERS:          'SET_FILTERS',
  SET_SORTS:            'SET_SORTS',
  SET_CURRENT_PAGE:     'SET_CURRENT_PAGE',
  SET_RESULTS_PER_PAGE: 'SET_RESULTS_PER_PAGE',
  SET_FOUND:            'SET_FOUND'
} as const;

export type State = SearchRequest & SearchResponse & {
  loading:     boolean;
  index:       string;
  suggestions: [];
};

export type SearchRequest = {
  term:           string;    // setTerm
  filters:        Filter[];  // setFilters (add, remove, clear)
  sorts:          Sort[];    // setSorts   (add, remove, clear)
  currentPage:    number;    // setCurrentPage     // OFFSET in MySQL
  resultsPerPage: number;    // setResultsPerPage  // LIMIT in MySQL
};

export type SearchResponse = {
  results:      [];
  totalResults: number;
  startPage:    number;
  endPage:      number;
  totalPages:   number;
};

export type Filter = {
  field:  string;    //"recipeType"  "method"  "cuisine"  recipeType=Main&method=stew&cuisine=AFG
  values: string[];  //["Main"]      ["Stew"]  ["AFG"]
};

export type Sort = {
  field:     string;
  direction: string;
};

export type IActions = 
  | IReset
  | ISetIndex
  | ISetTerm
  | ISetFilters
  | ISetSorts
  | ISetCurrentPage
  | ISetResultsPerPage
  | ISetFound;

interface IReset {
  type: typeof actionTypes.RESET;
}

interface ISetIndex {
  type:  typeof actionTypes.SET_INDEX;
  index: string;
}

interface ISetTerm {
  type: typeof actionTypes.SET_TERM;
  term: string;
}

interface ISetFilters {
  type:    typeof actionTypes.SET_FILTERS;
  filters: Filter[];
}

interface ISetSorts {
  type:  typeof actionTypes.SET_SORTS;
  sorts: Sort[];
}

interface ISetCurrentPage {
  type:        typeof actionTypes.SET_CURRENT_PAGE;
  currentPage: number;
}

interface ISetResultsPerPage {
  type:           typeof actionTypes.SET_RESULTS_PER_PAGE;
  resultsPerPage: number;
}

interface ISetFound {
  type:  typeof actionTypes.SET_FOUND;
  found: SearchResponse;
}
