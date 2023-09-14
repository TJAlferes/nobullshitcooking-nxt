const initialState: State = {
  loading: false,
  // search request state:  // move these into URL
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
  // search response state:  // move these into localStorage (or at least useState) (IndexDB later on if needed)
  results:       [],
  total_results: 0,
  total_pages:   0
};

export function searchReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case RESET:     return {...state, ...initialState};
    case SET_FILTERS:
      return {
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
      return {
        ...state,
        sorts: {
          ...state.sorts,
          [action.col]: action.direction
        }
      };
    case SET_CURRENT_PAGE:     return {...state, current_page: action.current_page};
    case SET_RESULTS_PER_PAGE: return {...state, results_per_page: action.results_per_page};
    case SET_RESULTS:
      return {
        ...state,
        results:       action.found.results,
        total_results: action.found.total_results,
        total_pages:   action.found.total_pages
      };
    default:              return state;
  }
};



// TO DO: clean up action that are not needed

export const reset = () => ({type: RESET});

export const setFilters = (key: FilterKey, values: string[]) => ({
  type: SET_FILTERS,
  key,
  values
});

export const addFilter = (key: FilterKey, value: string) => ({
  type: ADD_FILTER,
  key,
  value
});

export const removeFilter = (key: FilterKey, value: string) => ({
  type: REMOVE_FILTER,
  key,
  value
});

export const setSorts = (col: string, direction: SortDirection) => ({
  type: SET_SORTS,
  col,
  direction
});

export const setCurrentPage = (currentPage: string) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

export const setResultsPerPage = (resultsPerPage: string) => ({
  type: SET_RESULTS_PER_PAGE,
  resultsPerPage
});

export const setResults = (found: SearchResponse) => ({type: SET_RESULTS, found});



export const actionTypes = {
  RESET:                'RESET',
  SET_FILTERS:          'SET_FILTERS',
  ADD_FILTER:           'ADD_FILTER',
  REMOVE_FILTER:        'REMOVE_FILTER',
  SET_SORTS:            'SET_SORTS',
  SET_CURRENT_PAGE:     'SET_CURRENT_PAGE',
  SET_RESULTS_PER_PAGE: 'SET_RESULTS_PER_PAGE',
  SET_RESULTS:          'SET_RESULTS'
} as const;

const {
  RESET,
  SET_FILTERS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_SORTS,
  SET_CURRENT_PAGE,
  SET_RESULTS_PER_PAGE,
  SET_RESULTS
} = actionTypes;

export type State = SearchRequest & SearchResponse & {
  loading: boolean;
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

export type SuggestionView = {
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
  | SetFilters
  | AddFilter
  | RemoveFilter
  | SetSorts
  | SetCurrentPage
  | SetResultsPerPage
  | SetResults;

export type Reset = {
  type: typeof actionTypes.RESET;
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

export type SetResults = {
  type:  typeof actionTypes.SET_RESULTS;
  found: SearchResponse;
};
