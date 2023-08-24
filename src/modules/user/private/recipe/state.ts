// TO DO: add PRIVATE_ to the equipment and ingredient modules just like here

export const createPrivateRecipe = (recipeInfo: RecipeInfo) =>
  ({type: CREATE_PRIVATE_RECIPE, recipeInfo});

export const updatePrivateRecipe = (recipeInfo: RecipeUpdateInfo) =>
  ({type: UPDATE_PRIVATE_RECIPE, recipeInfo});

export const deletePrivateRecipe = (recipe_id: string) =>
  ({type: DELETE_PRIVATE_RECIPE, recipe_id});



export const actionTypes = {
  CREATE_PRIVATE_RECIPE: 'CREATE_PRIVATE_RECIPE',
  UPDATE_PRIVATE_RECIPE: 'UPDATE_PRIVATE_RECIPE',
  DELETE_PRIVATE_RECIPE: 'DELETE_PRIVATE_RECIPE'
} as const;

const {
  CREATE_PRIVATE_RECIPE,
  UPDATE_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE
} = actionTypes;

export type CreatePrivateRecipe = {
  type:        typeof actionTypes.CREATE_PRIVATE_RECIPE;
  recipe_info: RecipeInfo;
};

export type UpdatePrivateRecipe = {
  type:        typeof actionTypes.UPDATE_PRIVATE_RECIPE;
  recipe_info: RecipeUpdateInfo;
};

export type DeletePrivateRecipe = {
  type:      typeof actionTypes.DELETE_PRIVATE_RECIPE;
  recipe_id: string;
};

// TO DO: move shared types to one location

export type RecipeInfo = {
  ownership:            string;
  recipe_type_id:       number;
  cuisine_id:           number;
  title:                string;
  description:          string;
  directions:           string;
  required_methods:     RequiredMethod[];
  required_equipment:   RequiredEquipment[];
  required_ingredients: RequiredIngredient[];
  required_subrecipes:  RequiredSubrecipe[];
  //recipeImage:          string | ArrayBuffer | null;
  //recipeFullImage:      File | null;
  //recipeThumbImage:     File | null;
  //recipeTinyImage:      File | null;
  //equipmentImage:       string | ArrayBuffer | null;
  //equipmentFullImage:   File | null;
  //ingredientsImage:     string | ArrayBuffer | null;
  //ingredientsFullImage: File | null;
  //cookingImage:         string | ArrayBuffer | null;
  //cookingFullImage:     File | null;
  //video:                string;
};

export type RecipeUpdateInfo = RecipeInfo & {
  recipe_id:            string;
  //recipePrevImage:      string;
  //equipmentPrevImage:   string;
  //ingredientsPrevImage: string;
  //cookingPrevImage:     string;
  //prevVideo:            string;
};

export type RequiredMethod = {
  method_id: number;
};

export type RequiredEquipment = {
  amount?:      number;
  equipment_id: string;
};

export type RequiredIngredient = {
  amount?:       number;
  unit_id?:      number;
  ingredient_id: string;
};

export type RequiredSubrecipe = {
  amount?:      number;
  unit_id?:     number;
  subrecipe_id: string;
};
