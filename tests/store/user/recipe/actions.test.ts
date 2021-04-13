import {
  userCreateNewPrivateRecipe,
  userEditPrivateRecipe,
  userDeletePrivateRecipe,
  userCreateNewPublicRecipe,
  userEditPublicRecipe,
  userDisownPublicRecipe
} from '../../../../src/store/user/recipe/actions';
import { actionTypes } from '../../../../src/store/user/recipe/types';

const {
  USER_CREATE_NEW_PRIVATE_RECIPE,
  USER_EDIT_PRIVATE_RECIPE,
  USER_DELETE_PRIVATE_RECIPE,
  USER_CREATE_NEW_PUBLIC_RECIPE,
  USER_EDIT_PUBLIC_RECIPE,
  USER_DISOWN_PUBLIC_RECIPE
} = actionTypes;

const creatingRecipeInfo = {
  ownership: "private",
  recipeTypeId: 1,
  cuisineId: 1,
  title: "My Secret Recipe",
  description: "Don't worry about it.",
  directions: "Do nothing.",
  requiredMethods: [{methodId: 1}, {methodId: 3}],
  requiredEquipment: [{amount: 1, equipment: 1}],
  requiredIngredients: [{amount: 1, measurementId: 1, ingredient: 1}],
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
  requiredMethods: [{methodId: 1}, {methodId: 3}],
  requiredEquipment: [{amount: 1, equipment: 1}],
  requiredIngredients: [{amount: 1, measurementId: 1, ingredient: 1}],
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

describe('userCreateNewPrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewPrivateRecipe(creatingRecipeInfo).type)
      .toEqual(USER_CREATE_NEW_PRIVATE_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(userCreateNewPrivateRecipe(creatingRecipeInfo).recipeInfo).toEqual(creatingRecipeInfo);
  });
});

describe('userEditPrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditPrivateRecipe(editingRecipeInfo).type)
      .toEqual(USER_EDIT_PRIVATE_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(userEditPrivateRecipe(editingRecipeInfo).recipeInfo)
      .toEqual(editingRecipeInfo);
  });
});

describe('userDeletePrivateRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeletePrivateRecipe(7).type).toEqual(USER_DELETE_PRIVATE_RECIPE);
  });

  it('returns the correct id', () => {
    expect(userDeletePrivateRecipe(7).id).toEqual(7);
  });
});



describe('userCreateNewPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewPublicRecipe(creatingRecipeInfo).type)
      .toEqual(USER_CREATE_NEW_PUBLIC_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(userCreateNewPublicRecipe(creatingRecipeInfo).recipeInfo)
      .toEqual(creatingRecipeInfo);
  });
});

describe('userEditPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditPublicRecipe(editingRecipeInfo).type)
      .toEqual(USER_EDIT_PUBLIC_RECIPE);
  });

  it('returns the correct recipeInfo', () => {
    expect(userEditPublicRecipe(editingRecipeInfo).recipeInfo)
      .toEqual(editingRecipeInfo);
  });
});

describe('userDisownPublicRecipe action creator', () => {
  it('returns the correct action type', () => {
    expect(userDisownPublicRecipe(7).type).toEqual(USER_DISOWN_PUBLIC_RECIPE);
  });

  it('returns the correct id', () => {
    expect(userDisownPublicRecipe(7).id).toEqual(7);
  });
});