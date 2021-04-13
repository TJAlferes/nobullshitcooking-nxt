import {
  staffCreateNewRecipe,
  staffEditRecipe,
  staffDeleteRecipe
} from '../../../../src/store/staff/recipe/actions';
import { actionTypes } from '../../../../src/store/staff/recipe/types';

const {
  STAFF_CREATE_NEW_RECIPE,
  STAFF_EDIT_RECIPE,
  STAFF_DELETE_RECIPE
} = actionTypes;

const creatingRecipeInfo = {
  ownership: "private",
  recipeTypeId: 1,
  cuisineId: 1,
  title: "My Secret Recipe",
  description: "Don't worry about it.",
  directions: "Do nothing.",
  requiredMethods: [{id: 1}, {id: 3}],
  requiredEquipment: [{amount: 1, id: 1}],
  requiredIngredients: [{amount: 1, measurementId: 1, id: 1}],
  requiredSubrecipes: [],
  recipeImage: null,
  recipeFullImage: null,
  recipeThumbImage: null,
  recipeTinyImage: null,
  equipmentImage: null,
  equipmentFullImage: null,
  ingredientsImage: null,
  ingredientsFullImage: null,
  cookingImage: null,
  cookingFullImage: null
};
const editingRecipeInfo = {
  id: 888,
  recipePrevImage: "nobsc-recipe-default",
  equipmentPrevImage: "nobsc-recipe-equipment-default",
  ingredientsPrevImage: "nobsc-recipe-ingredients-default",
  cookingPrevImage: "nobsc-recipe-cooking-default",
  ownership: "private",
  recipeTypeId: 1,
  cuisineId: 1,
  title: "My Secret Recipe",
  description: "Don't worry about it.",
  directions: "Do nothing.",
  requiredMethods: [{id: 1}, {id: 3}],
  requiredEquipment: [{amount: 1, id: 1}],
  requiredIngredients: [{amount: 1, measurementId: 1, id: 1}],
  requiredSubrecipes: [],
  recipeImage: null,
  recipeFullImage: null,
  recipeThumbImage: null,
  recipeTinyImage: null,
  equipmentImage: null,
  equipmentFullImage: null,
  ingredientsImage: null,
  ingredientsFullImage: null,
  cookingImage: null,
  cookingFullImage: null
};

describe('staffCreateNewRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(staffCreateNewRecipe(creatingRecipeInfo).type)
      .toEqual(STAFF_CREATE_NEW_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(staffCreateNewRecipe(creatingRecipeInfo).recipeInfo)
      .toEqual(creatingRecipeInfo);
  });
});

describe('staffEditRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(staffEditRecipe(editingRecipeInfo).type).toEqual(STAFF_EDIT_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(staffEditRecipe(editingRecipeInfo).recipeInfo)
      .toEqual(editingRecipeInfo);
  });
});

describe('staffDeleteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(staffDeleteRecipe(7).type).toEqual(STAFF_DELETE_RECIPE);
  });

  it('returns the correct id', () => {
    expect(staffDeleteRecipe(7).id).toEqual(7);
  });
});