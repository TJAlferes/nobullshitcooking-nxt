export type SearchRequest = {
  //[index: string]: any;
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

export type SearchIndex =
  | "recipes"
  | "ingredients"
  | "equipment";

export type Filter = {
  key:    FilterKey;  //"recipe_type"  "method"  "cuisine"  recipe_type=Main&method=Stew&cuisine=AFG
  values: string[];   //["Main"]       ["Stew"]  ["AFG"]
};

export type FilterKey =
  | "equipment_types"
  | "ingredient_types"
  | "recipe_types"
  | "methods"
  | "cuisines";

export type Sort = {
  col:       string;  // CAREFUL of overlaps  // TO DO: improve
  direction: SortDirection;
};

export type SortDirection = "asc" | "desc" | "none";

export type SetSorts = {
  col:       string;
  direction: string;
};  // TO DO: move (and rename to SetSortsParams ???)

export type SearchResponse = {
  results:       Partial<SearchResults>[];
  total_results: number;
  total_pages:   number;
};

type SearchResults = RecipeCard & EquipmentCard & IngredientCard;

export type RecipeCard = {
  recipe_id:        string;
  author:           string;
  recipe_type_name: string;
  cuisine_name:     string;
  title:            string;
  description:      string;  // is this needed???
  image_filename:   string;
};

export type EquipmentCard = {
  equipment_id:        string;
  equipment_type_name: string;
  equipment_name:      string;
  image_filename:      string;
};

export type IngredientCard = {
  ingredient_id:        string;
  ingredient_type_name: string;
  fullname:             string;
  image_filename:       string;
};

export type SuggestionView = {
  id:     string;
  text:   string;
  image?: string;
};
