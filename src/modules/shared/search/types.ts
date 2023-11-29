export type SearchIndex =
  | "recipe"
  | "ingredient"
  | "equipment"
  | "product";
  //| "page"
  //| "post";

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

export type FilterKey =
  | "equipmentTypes"
  | "ingredientTypes"
  | "recipeTypes"
  | "methods"
  | "cuisines";


export type Sort = {
  col:       string;  // CAREFUL of overlaps
  direction: SortDirection;
};

export type SortDirection = "asc" | "desc" | "none";

export type SetSorts = {
  col:       string;
  direction: string;
};  // TO DO: move (and rename to SetSortsParams ???)
