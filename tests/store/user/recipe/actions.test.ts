import {
  createNewPrivateRecipe,
  editPrivateRecipe,
  deletePrivateRecipe,
  createNewPublicRecipe,
  editPublicRecipe,
  disownPublicRecipe
} from '../../../../src/store/user/recipe/actions';
import { actionTypes } from '../../../../src/store/user/recipe/types';

const {
  CREATE_NEW_PRIVATE_RECIPE,
  EDIT_PRIVATE_RECIPE,
  DELETE_PRIVATE_RECIPE,
  CREATE_NEW_PUBLIC_RECIPE,
  EDIT_PUBLIC_RECIPE,
  DISOWN_PUBLIC_RECIPE
} = actionTypes;

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

describe('createNewPrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewPrivateRecipe(creatingInfo).type).toEqual(CREATE_NEW_PRIVATE_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(createNewPrivateRecipe(creatingInfo).recipeInfo).toEqual(creatingInfo);
  });
});

describe('editPrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(editPrivateRecipe(editInfo).type).toEqual(EDIT_PRIVATE_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(editPrivateRecipe(editInfo).recipeInfo).toEqual(editInfo);
  });
});

describe('deletePrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(deletePrivateRecipe(7).type).toEqual(DELETE_PRIVATE_RECIPE);
  });

  it('returns the correct id', () => {
    expect(deletePrivateRecipe(7).id).toEqual(7);
  });
});



describe('createNewPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewPublicRecipe(creatingInfo).type).toEqual(CREATE_NEW_PUBLIC_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(createNewPublicRecipe(creatingInfo).recipeInfo).toEqual(creatingInfo);
  });
});

describe('editPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(editPublicRecipe(editInfo).type).toEqual(EDIT_PUBLIC_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(editPublicRecipe(editInfo).recipeInfo).toEqual(editInfo);
  });
});

describe('disownPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(disownPublicRecipe(7).type).toEqual(DISOWN_PUBLIC_RECIPE);
  });

  it('returns the correct id', () => {
    expect(disownPublicRecipe(7).id).toEqual(7);
  });
});