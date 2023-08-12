// IMPORTANT: these types must be identical with the ones from the api

export interface IRecipe {
  recipe_id:            string;
  recipe_type_id:       number;
  cuisine_id:           number;
  author_id:            string;
  owner_id:             string;
  title:                string;
  recipe_type_name:     string;
  cuisine_name:         string;
  author:               string;
  description:          string;
  active_time:          string;
  total_time:           string;
  directions:           string;
  image_url:            string;
  required_methods:     RequiredMethod[];
  required_equipment:   RequiredEquipment[];
  required_ingredients: RequiredIngredient[];
  required_subrecipes:  RequiredSubrecipe[];
}

type RequiredMethod = {
  method_name: string;
};

type RequiredEquipment = {
  amount?:        number;
  equipment_name: string;
};

type RequiredIngredient = {
  amount?:         number;
  unit_name?:      string;
  ingredient_name: string;
};

type RequiredSubrecipe = {
  amount?:         number;
  unit_name?:      string;
  subrecipe_title: string;
};
