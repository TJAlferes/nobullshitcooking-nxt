export const actionTypes = {
  RESET:                'RESET',
  SET_INDEX:            'SET_INDEX',
  SET_TERM:             'SET_TERM',
  SET_FILTERS:          'SET_FILTERS',
  SET_SORTS:            'SET_SORTS',
  SET_CURRENT_PAGE:     'SET_CURRENT_PAGE',
  SET_RESULTS_PER_PAGE: 'SET_RESULTS_PER_PAGE',
  GET_RESULTS:          'GET_RESULTS',
  GET_SUGGESTIONS:      'GET_SUGGESTIONS',
  SET_RESULTS:          'SET_RESULTS',
  SET_SUGGESTIONS:      'SET_SUGGESTIONS'
} as const;

export type State = SearchRequest & SearchResponse & {
  loading:     boolean;
  index:       SearchIndex;
  suggestions: any[];  // FINISH
};

export type SearchIndex = "recipes" | "ingredients" | "equipment" | "products";

export type SearchRequest = {
  term:           string;    // setTerm
  filters:        {
    equipmentTypes:    string[],
    ingredientTypes:   string[],
    recipeTypes:       string[],
    methods:           string[],
    cuisines:          string[],
    productCategories: string[],
    productTypes:      string[]
  };                       // setFilters (add, remove, clear)
  sorts:          {};      // setSorts   (add, remove, clear)
  currentPage:    number;  // setCurrentPage     // OFFSET in MySQL
  resultsPerPage: number;  // setResultsPerPage  // LIMIT in MySQL
};

export type SearchResponse = {
  results:      [];
  totalResults: number;
  startPage:    number;
  endPage:      number;
  totalPages:   number;
};

export type Filter = {
  key:    FilterKey;  //"recipeType"  "method"  "cuisine"  recipeType=Main&method=stew&cuisine=AFG
  values: string[];   //["Main"]      ["Stew"]  ["AFG"]
};

export type FilterKey = "equipmentTypes" | "ingredientTypes" | "recipeTypes" | "methods" | "cuisines" | "productCategories" | "productTypes";

export type Sort = {
  col:       string;  // CAREFUL of overlaps
  direction: SortDirection;
};

export type SortDirection = "asc" | "desc" | "none";

export type IActions = 
  | IReset
  | ISetIndex
  | ISetTerm
  | ISetFilters
  | ISetSorts
  | ISetCurrentPage
  | ISetResultsPerPage
  | IGetResults
  | IGetSuggestions
  | ISetResults
  | ISetSuggestions;

export interface IReset {
  type: typeof actionTypes.RESET;
}

export interface ISetIndex {
  type:  typeof actionTypes.SET_INDEX;
  index: SearchIndex;
}

export interface ISetTerm {
  type: typeof actionTypes.SET_TERM;
  term: string;
}

export interface ISetFilters {
  type:    typeof actionTypes.SET_FILTERS;
  key:     string;
  values:  string[];
}

export interface ISetSorts {
  type:      typeof actionTypes.SET_SORTS;
  col:       string;
  direction: string;
}

export interface ISetCurrentPage {
  type:        typeof actionTypes.SET_CURRENT_PAGE;
  currentPage: number;
}

export interface ISetResultsPerPage {
  type:           typeof actionTypes.SET_RESULTS_PER_PAGE;
  resultsPerPage: number;
}

export interface IGetResults {
  type: typeof actionTypes.GET_RESULTS;
}

export interface IGetSuggestions {
  type: typeof actionTypes.GET_SUGGESTIONS;
}

export interface ISetResults {
  type:  typeof actionTypes.SET_RESULTS;
  found: SearchResponse;
}

export interface ISetSuggestions {
  type:        typeof actionTypes.SET_SUGGESTIONS;
  suggestions: any[];  // FINISH
}
