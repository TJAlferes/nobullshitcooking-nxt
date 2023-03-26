export interface IRecipe {
  id:                number;
  recipe_type_id:    number;
  cuisine_id:        number;
  author_id:         number;
  owner_id:          number;

  title:             string;
  recipe_type_name:  string;
  cuisine_name:      string;
  author:            string;
  author_avatar:     string;  // ?
  description:       string;
  active_time:       string;
  total_time:        string;
  directions:        string;

  recipe_image:      string;
  equipment_image:   string;
  ingredients_image: string;
  cooking_image:     string;
  //video:             string;

  methods:           RequiredMethod[];
  equipment:         RequiredEquipment[];
  ingredients:       RequiredIngredient[];
  subrecipes:        RequiredSubrecipe[];
}

type RequiredMethod = {
  method_name: string;
};

type RequiredEquipment = {
  amount:         number;
  equipment_name: string;
};

type RequiredIngredient = {
  amount:           number;
  measurement_name: string;
  ingredient_name:  string;
};

type RequiredSubrecipe = {
  amount:           number;
  measurement_name: string;
  subrecipe_title:  string;
};
