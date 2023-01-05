import { IEquipmentRow, IIngredientRow, IMethods, ISubrecipeRow } from '../index.page';

export function validRecipeInfo({
  cuisineId,
  description,
  directions,
  equipmentRows,
  ingredientRows,
  usedMethods,
  ownership,
  recipeTypeId,
  setFeedback,
  subrecipeRows,
  title
}: RecipeInfo): boolean {
  function feedback(message: string) {
    window.scrollTo(0,0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validOwnership = ownership === "private" || ownership === "public";
  if (!validOwnership) return feedback("Select ownership.");

  const validRecipeTypeId = recipeTypeId !== 0;
  if (!validRecipeTypeId) return feedback("Select recipe type.");

  const validCuisineId = cuisineId !== 0;
  if (!validCuisineId) return feedback("Select cuisine.");

  const validTitle = title.trim() !== "";
  if (!validTitle) return feedback("Enter title.");

  const validDescription = description.trim() !== "";
  if (!validDescription) return feedback("Enter description.");

  const validDirections = directions.trim() !== "";
  if (!validDirections) return feedback("Enter directions.");

  const validMethods = Object.values(usedMethods).filter(m => m === true);
  //validMethods.length < 1
  if (!validMethods) return feedback("Select method(s).");

  let validEquipmentRows = true;
  if (equipmentRows.length) {
    equipmentRows.map(r => {
      if (r.amount === "" || r.equipment === "") validEquipmentRows = false;
    });
    if (!validEquipmentRows) return feedback("Review equipment.");
  }

  let validIngredientRows = true;
  if (ingredientRows.length) {
    ingredientRows.map(r => {
      if (r.amount === "" || r.unit === "" || r.ingredient === "") validIngredientRows = false;  // TO DO: change to measurementId or measurementName?
    });
    if (!validIngredientRows) return feedback("Review ingredients.");
  }

  let validSubrecipeRows = true;
  if (subrecipeRows.length) {
    subrecipeRows.map(r => {
      if (r.amount === "" || r.unit === "" || r.subrecipe === "") validSubrecipeRows = false;  // TO DO: change to measurementId or measurementName?
    });
    if (!validSubrecipeRows) return feedback("Review subrecipes.");
  }

  return true;
}

type RecipeInfo = {
  cuisineId:                     number;
  description:                   string;
  directions:                    string;
  equipmentRows:                 IEquipmentRow[];
  ingredientRows:                IIngredientRow[];
  usedMethods:                   IMethods;
  ownership:                     string;
  recipeTypeId:                  number;
  setFeedback(feedback: string): void;
  subrecipeRows:                 ISubrecipeRow[];
  title:                         string;
};