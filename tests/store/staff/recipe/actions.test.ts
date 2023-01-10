import { createNewRecipe, editRecipe, deleteRecipe } from '../../../../src/store/staff/recipe/actions';
import { actionTypes } from '../../../../src/store/staff/recipe/types';

const { CREATE_NEW_RECIPE, EDIT_RECIPE, DELETE_RECIPE } = actionTypes;

const creatingInfo = {
  ownership:            "private",
  recipeTypeId:         1,
  cuisineId:            1,
  title:                "My Secret Recipe",
  description:          "Don't worry about it.",
  directions:           "Do nothing.",
  methods:              [{id: 1}, {id: 3}],
  equipment:            [{amount: 1, id: 1}],
  ingredients:          [{amount: 1, measurementId: 1, id: 1}],
  subrecipes:           [],
  recipeImage:          null,
  recipeFullImage:      null,
  recipeThumbImage:     null,
  recipeTinyImage:      null,
  equipmentImage:       null,
  equipmentFullImage:   null,
  ingredientsImage:     null,
  ingredientsFullImage: null,
  cookingImage:         null,
  cookingFullImage:     null
};
const editInfo = {
  id:                   888,
  recipePrevImage:      "nobsc-recipe-default",
  equipmentPrevImage:   "nobsc-recipe-equipment-default",
  ingredientsPrevImage: "nobsc-recipe-ingredients-default",
  cookingPrevImage:     "nobsc-recipe-cooking-default",
  ...creatingInfo
};

describe('createNewRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewRecipe(creatingInfo).type).toEqual(CREATE_NEW_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(createNewRecipe(creatingInfo).recipeInfo).toEqual(creatingInfo);
  });
});

describe('editRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(editRecipe(editInfo).type).toEqual(EDIT_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(editRecipe(editInfo).recipeInfo).toEqual(editInfo);
  });
});

describe('deleteRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(deleteRecipe(7).type).toEqual(DELETE_RECIPE);
  });

  it('returns the correct id', () => {
    expect(deleteRecipe(7).id).toEqual(7);
  });
});