const initialState: State = {
  // search request state:  // move these into URL
  index: "recipes",
  term: "",
  filters: {
    equipment_types: [],
    ingredient_types: [],
    recipe_types: [],
    methods: [],
    cuisines: [],
  },
  sorts: {},
  current_page: "1",
  results_per_page: "20"
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



export const actionTypes = {
  RESET:                'RESET',
  SET_FILTERS:          'SET_FILTERS',
  SET_SORTS:            'SET_SORTS',
  SET_CURRENT_PAGE:     'SET_CURRENT_PAGE',
  SET_RESULTS_PER_PAGE: 'SET_RESULTS_PER_PAGE'
} as const;

const {
  RESET,
  SET_FILTERS,
  SET_SORTS,
  SET_CURRENT_PAGE,
  SET_RESULTS_PER_PAGE
} = actionTypes;

export type State = SearchRequest;

// TO DO: move shared types to one location

export type SearchIndex = "recipes" | "ingredients" | "equipment" | "products";  // "pages" | "posts" | 

export type SearchRequest = {
  index: SearchIndex;
  term?: string;
  filters?:          {
    [index: string]:   string[];
    equipment_types?:  string[];
    ingredient_types?: string[];
    recipe_types?:     string[];
    methods?:          string[];
    cuisines?:         string[];
  };
  sorts?:            {};
  current_page?:     string;
  results_per_page?: string;
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
  | SetSorts
  | SetCurrentPage
  | SetResultsPerPage;

export type Reset = {
  type: typeof actionTypes.RESET;
};

export type SetFilters = {
  type:    typeof actionTypes.SET_FILTERS;
  key:     string;
  values:  string[];
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
