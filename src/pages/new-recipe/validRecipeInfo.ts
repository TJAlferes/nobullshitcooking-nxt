import type { IEquipmentRow, IIngredientRow, IMethods, ISubrecipeRow } from './index.page';

export function validRecipeInfo({
  ownership,
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
}: RecipeInfo): boolean {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validOwnership = ownership === "private" || ownership === "public";
  if (!validOwnership) return feedback("Select ownership.");

  const validRecipeTypeId = recipe_type_id !== 0;
  if (!validRecipeTypeId) return feedback("Select recipe type.");

  const validCuisineId = cuisine_id !== 0;
  if (!validCuisineId) return feedback("Select cuisine.");  // TO DO: custom cuisine

  const validTitle = title.trim() !== "";
  if (!validTitle) return feedback("Enter title.");

  const validDescription = description.trim() !== "";
  if (!validDescription) return feedback("Enter description.");

  const validDirections = directions.trim() !== "";
  if (!validDirections) return feedback("Enter directions.");

  const validMethods = Object.values(required_methods).filter(m => m === true);
  //validMethods.length < 1
  if (!validMethods) return feedback("Select required method(s).");

  let validEquipment = true;
  if (required_equipment.length) {
    required_equipment.map(r => {
      if (r.amount === "" || r.id === "") validEquipment = false;
    });
    if (!validEquipment) return feedback("Review required equipment.");
  }

  let validIngredients = true;
  if (required_ingredients.length) {
    required_ingredients.map(r => {
      if (r.amount === "" || r.measurementId === "" || r.type === "" || r.id === "") validIngredients = false;
    });
    if (!validIngredients) return feedback("Review required ingredients.");
  }

  let validSubrecipes = true;
  if (required_subrecipes.length) {
    required_subrecipes.map(r => {
      if (r.amount === "" || r.measurementId === "" || r.type === "" || r.cuisine === "" || r.id === "") validSubrecipes = false;
    });
    if (!validSubrecipes) return feedback("Review required subrecipes.");
  }

  return true;
}

// TO DO: move all types to one location

type RecipeInfo = {
  ownership:            string;
  recipe_type_id:       number;
  cuisine_id:           number;
  title:                string;
  description:          string;
  directions:           string;
  required_methods:     IMethods;
  required_equipment:   IEquipmentRow[];
  required_ingredients: IIngredientRow[];
  required_subrecipes:  ISubrecipeRow[];
  setFeedback:          (feedback: string) => void;
};
