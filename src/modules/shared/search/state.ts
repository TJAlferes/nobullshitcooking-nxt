import type { useRouter } from 'next/navigation';



const initialState: State = {
  loading: false,
  index:   "recipes",

  // search request state:
  term:             "",
  current_page:     "1",
  results_per_page: "20",
  sorts:            {},
  filters:          {
    equipment_types:  [],
    ingredient_types: [],
    recipe_types:     [],
    methods:          [],
    cuisines:         [],
  },

  // search response state:
  //resultTerm:    "",
  results:       [],
  total_results: 0,
  total_pages:   0,

  // autosuggest response state:
  suggestions:    []
};

export const searchReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case RESET:
      return {...state, ...initialState};
    case SET_INDEX:
      return {...state, index: action.index};
    case SET_TERM:
      return {...state, term: action.term};
    
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

    case SET_SORTS:
      return {...state, sorts: {...state.sorts, [action.col]: action.direction}};
    case SET_CURRENT_PAGE:
      return {...state, current_page: action.current_page};
    case SET_RESULTS_PER_PAGE:
      return {...state, results_per_page: action.results_per_page};
    case SET_RESULTS:
      return {
        ...state,
        //termResult: action.found.termResult,
        results:       action.found.results,
        total_results: action.found.total_results,
        total_pages:   action.found.total_pages
      };
    case SET_SUGGESTIONS:
      return {...state, suggestions: action.suggestions};
    default: return state;
  }
};



// TO DO: clean up action that are not needed

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



export const actionTypes = {
  RESET:                'RESET',
  SET_INDEX:            'SET_INDEX',
  SET_TERM:             'SET_TERM',
  SET_FILTERS:          'SET_FILTERS',
  ADD_FILTER:           'ADD_FILTER',
  REMOVE_FILTER:        'REMOVE_FILTER',
  SET_SORTS:            'SET_SORTS',
  SET_CURRENT_PAGE:     'SET_CURRENT_PAGE',
  SET_RESULTS_PER_PAGE: 'SET_RESULTS_PER_PAGE',
  GET_RESULTS:          'GET_RESULTS',
  GET_SUGGESTIONS:      'GET_SUGGESTIONS',
  SET_RESULTS:          'SET_RESULTS',
  SET_SUGGESTIONS:      'SET_SUGGESTIONS'
} as const;

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

export type State = SearchRequest & SearchResponse & {
  loading:     boolean;
  index:       SearchIndex;
  suggestions: Suggestion[];
};

// TO DO: move shared types to one location

export type SearchIndex = "recipes" | "ingredients" | "equipment" | "products";  // "pages" | "posts" | 

export type SearchRequest = {
  term?:             string;
  current_page?:     string;
  results_per_page?: string;
  sorts?:            {};
  filters?:          {
    [index: string]:   string[];
    equipment_types?:  string[];
    ingredient_types?: string[];
    recipe_types?:     string[];
    methods?:          string[];
    cuisines?:         string[];
  };
};

// TO DO: move?
export type RecipeCard = {
  recipe_id:        string;
  author:           string;
  recipe_type_name: string;
  cuisine_name:     string;
  title:            string;
  description:      string;
  recipe_image:     string;
};

export type EquipmentCard = {
  equipment_id:        string;
  equipment_type_name: string;
  name:                string;
};

export type IngredientCard = {
  ingredient_id:        string;
  ingredient_type_name: string;
  name:                 string;
};

export type Suggestion = {
  id:     string;
  text:   string;
  image?: string;
};

export type SearchResponse = {
  results:       any[];  // EquipmentCard[] | IngredientCard[] | ProductCard[] | RecipeCard[];
  total_results: number;
  total_pages:   number;
};

export type Filter = {
  key:    FilterKey;  //"recipe_type"  "method"  "cuisine"  recipe_type=Main&method=stew&cuisine=AFG
  values: string[];   //["Main"]       ["Stew"]  ["AFG"]
};

export type FilterKey = "equipmentTypes" | "ingredientTypes" | "recipeTypes" | "methods" | "cuisines";

export type Sort = {
  col:       string;  // CAREFUL of overlaps
  direction: SortDirection;
};

export type SortDirection = "asc" | "desc" | "none";

export type Actions = 
  | Reset
  | SetIndex
  | SetTerm
  | SetFilters
  | AddFilter
  | RemoveFilter
  | SetSorts
  | SetCurrentPage
  | SetResultsPerPage
  | GetResults
  | GetSuggestions
  | SetResults
  | SetSuggestions;

export type Reset = {
  type: typeof actionTypes.RESET;
};

export type SetIndex = {
  type:  typeof actionTypes.SET_INDEX;
  index: SearchIndex;
};

export type SetTerm = {
  type: typeof actionTypes.SET_TERM;
  term: string;
};

export type SetFilters = {
  type:    typeof actionTypes.SET_FILTERS;
  key:     string;
  values:  string[];
};

export type AddFilter = {
  type:   typeof actionTypes.ADD_FILTER;
  key:    string;
  value:  string;
};

export type RemoveFilter = {
  type:   typeof actionTypes.REMOVE_FILTER;
  key:    string;
  value:  string;
};

export type SetSorts = {
  type:      typeof actionTypes.SET_SORTS;
  col:       string;
  direction: string;
};

export type SetCurrentPage = {
  type:         typeof actionTypes.SET_CURRENT_PAGE;
  current_page: string;
};

export type SetResultsPerPage = {
  type:             typeof actionTypes.SET_RESULTS_PER_PAGE;
  results_per_page: string;
};

export type GetResults = {
  type:          typeof actionTypes.GET_RESULTS;
  search_params: string;
  router:        ReturnType<typeof useRouter>;
};

export type GetSuggestions = {
  type: typeof actionTypes.GET_SUGGESTIONS;
  term: string;
};

export type SetResults = {
  type:  typeof actionTypes.SET_RESULTS;
  found: SearchResponse;
};

export type SetSuggestions = {
  type:        typeof actionTypes.SET_SUGGESTIONS;
  suggestions: Suggestion[];
};
