import type { Crop }    from 'react-image-crop';
import { v4 as uuidv4 } from 'uuid';

export function ToolTip() {
  return (
    <span className="crop-tool-tip">
      Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
    </span>
  );
}

export const pristineEquipmentRow = {
  key:               uuidv4(),
  amount:            0,
  equipment_type_id: 0,
  equipment_id:      ""
};

export const pristineIngredientRow = {
  key:                uuidv4(),
  amount:             0,
  unit_id:            0,
  ingredient_type_id: 0,
  ingredient_id:      ""
};

export const pristineSubrecipeRow = {
  key:            uuidv4(),
  amount:         0,
  unit_id:        0,
  recipe_type_id: 0,
  cuisine_id:     0,
  subrecipe_id:   ""
};

export const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};  // TO DO: change to NOBSC images ratio

export const commonReactCropProps = {
  aspect:    1,
  className: "crop-tool",
  disabled:  true,
  locked:    true,
  maxHeight: 346,
  maxWidth:  560,
  minHeight: 346,
  minWidth:  560,
  style: {
    minHeight: "346px"
  }
};

export function isValidRecipeUpload({
  recipe_type_id,
  cuisine_id,
  title,
  description,
  directions,
  required_methods,
  required_equipment,
  required_ingredients,
  required_subrecipes,
  setFeedback
}: IsValidRecipeUploadParams): boolean {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validRecipeTypeId = recipe_type_id !== 0;
  if (!validRecipeTypeId) return feedback("Select recipe type.");

  const validCuisineId = cuisine_id !== 0;
  if (!validCuisineId) return feedback("Select cuisine.");

  const validTitle = title.trim() !== "";
  if (!validTitle) return feedback("Enter title.");

  const validDescription = description.trim() !== "";
  if (!validDescription) return feedback("Enter description.");

  const validDirections = directions.trim() !== "";
  if (!validDirections) return feedback("Enter directions.");

  const validMethods = required_methods.length < 1;
  if (!validMethods) return feedback("Select required method(s).");

  let validEquipment = true;
  if (required_equipment.length) {
    required_equipment.map(r => {
      if (!r.equipment_id) {
        validEquipment = false;
      }
    });
    
    if (!validEquipment) return feedback("Review required equipment.");
  }

  let validIngredients = true;
  if (required_ingredients.length) {
    required_ingredients.map(r => {
      if (!r.ingredient_id) {
        validIngredients = false;
      }
    });

    if (!validIngredients) return feedback("Review required ingredients.");
  }

  let validSubrecipes = true;
  if (required_subrecipes.length) {
    required_subrecipes.map(r => {
      if (!r.subrecipe_id) {
        validSubrecipes = false;
      }
    });

    if (!validSubrecipes) return feedback("Review required subrecipes.");
  }

  return true;
}

type IsValidRecipeUploadParams = {
  recipe_type_id:       number;
  cuisine_id:           number;
  title:                string;
  description:          string;
  directions:           string;
  required_methods:     RequiredMethod[];
  required_equipment:   RequiredEquipment[];
  required_ingredients: RequiredIngredient[];
  required_subrecipes:  RequiredSubrecipe[];
  setFeedback:          (feedback: string) => void;
};



export type RequiredMethod = {
  method_id: number;
};

export type RequiredEquipment = {
  amount:       number;
  equipment_id: string;
};

export type RequiredIngredient = {
  amount:        number;
  unit_id:       number;
  ingredient_id: string;
};

export type RequiredSubrecipe = {
  amount:       number;
  unit_id:      number;
  subrecipe_id: string;
};



export type ExistingRecipeToEdit = {
  recipe_id:            string;
  recipe_type_id:       number;
  cuisine_id:           number;
  owner_id:             string;
  title:                string;
  description:          string;
  directions:           string;
  required_methods:     ExistingRequiredMethod[];
  required_equipment:   ExistingRequiredEquipment[];
  required_ingredients: ExistingRequiredIngredient[];
  required_subrecipes:  ExistingRequiredSubrecipe[];
  recipe_image:         string;
  equipment_image:      string;
  ingredients_image:    string;
  cooking_image:        string;
};

export type ExistingRequiredMethod = RequiredMethod;

export type ExistingRequiredEquipment = RequiredEquipment & {
  equipment_type_id: number;  // (just a filter for nicer UX, not stored in DB)
};

export type ExistingRequiredIngredient = RequiredIngredient & {
  ingredient_type_id: number;  // (just a filter for nicer UX, not stored in DB)
};

export type ExistingRequiredSubrecipe = RequiredSubrecipe & {
  recipe_type_id: number;  // (just a filter for nicer UX, not stored in DB)
  cuisine_id:     number;  // (just a filter for nicer UX, not stored in DB)
};



export type Methods = {
  [key: number]: boolean;
};

export type EquipmentRow = ExistingRequiredEquipment & {
  [index: string]: number|string;
  key: string;
};

export type IngredientRow = ExistingRequiredIngredient & {
  [index: string]: number|string;
  key: string;
};

export type SubrecipeRow = ExistingRequiredSubrecipe & {
  [index: string]: number|string;
  key: string;
};
