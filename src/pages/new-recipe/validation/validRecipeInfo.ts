import { IRequiredEquipment, IRequiredIngredient, IRequiredMethod, IRequiredSubrecipe } from '../../../store/staff/recipe/types';
//import { IEquipmentRow, IIngredientRow, IMethods, ISubrecipeRow } from '../index.page';

export function validRecipeInfo({
  ownership,
  recipeTypeId,
  cuisineId,
  title,
  description,
  directions,
  methods,
  equipment,
  ingredients,
  subrecipes,
  setFeedback
  
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

  const validMethods = Object.values(methods).filter(m => m === true);
  //validMethods.length < 1
  if (!validMethods) return feedback("Select method(s).");

  let validEquipment = true;
  if (equipment.length) {
    equipment.map(r => {
      // not sufficient?
      if (r.amount === "" || r.equipment === "") validEquipment = false;
    });
    if (!validEquipment) return feedback("Review equipment.");
  }

  let validIngredients = true;
  if (ingredients.length) {
    ingredients.map(r => {
      // not sufficient?
      if (r.amount === "" || r.measurementId === "" || r.type === "" || r.id === "") validIngredients = false;
    });
    if (!validIngredients) return feedback("Review ingredients.");
  }

  let validSubrecipes = true;
  if (subrecipes.length) {
    subrecipes.map(r => {
      // not sufficient?
      if (r.amount === "" || r.measurementId === "" || r.type === "" || r.cuisine === "" || r.id === "") validSubrecipes = false;
    });
    if (!validSubrecipes) return feedback("Review subrecipes.");
  }

  return true;
}

type RecipeInfo = {
  ownership:                     string;
  recipeTypeId:                  number;
  cuisineId:                     number;
  title:                         string;
  description:                   string;
  directions:                    string;
  methods:                       IRequiredMethod[];
  equipment:                     IRequiredEquipment[];
  ingredients:                   IRequiredIngredient[];
  subrecipes:                    IRequiredSubrecipe[];
  setFeedback(feedback: string): void;
};