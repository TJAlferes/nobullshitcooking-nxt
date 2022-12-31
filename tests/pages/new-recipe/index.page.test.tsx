import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import NewRecipe from '../../../src/pages/new-recipe/index.page';
import { staffCreateNewRecipe, staffEditRecipe, } from '../../../src/store/staff/recipe/actions';
import { userCreateNewPrivateRecipe, userCreateNewPublicRecipe, userEditPrivateRecipe, userEditPublicRecipe } from '../../../src/store/user/recipe/actions';
import mockFn from '../../mockFn';

const mockPush = jest.fn();
const useRouter = jest.spyOn(require("next/router"), "useRouter");
// place inside beforeEach?
useRouter.mockImplementation(() => ({push: mockPush, query: {}}));

const mockedStaffCreateNewRecipe =       mockFn(staffCreateNewRecipe);
const mockedStaffEditRecipe =            mockFn(staffEditRecipe);
const mockedUserCreateNewPrivateRecipe = mockFn(userCreateNewPrivateRecipe);
const mockedUserCreateNewPublicRecipe =  mockFn(userCreateNewPublicRecipe);
const mockedUserEditPrivateRecipe =      mockFn(userEditPrivateRecipe);
const mockedUserEditPublicRecipe =       mockFn(userEditPublicRecipe);

type Actions =
  typeof mockedStaffCreateNewRecipe |
  typeof mockedStaffEditRecipe |
  typeof mockedUserCreateNewPrivateRecipe |
  typeof mockedUserCreateNewPublicRecipe |
  typeof mockedUserEditPrivateRecipe |
  typeof mockedUserEditPublicRecipe;

jest.mock('react-redux', () => ({
  connect:     () => jest.fn(),
  useSelector: jest.fn(fn => fn()),
  useDispatch: (fn: Actions) => jest.fn()
}));

const data = {
  recipe: {
    id:                   1,
    recipe_type_id:       1,
    cuisine_id:           1,
    owner_id:             1,
    title:                "Mixed Drink",
    description:          "An inticing description.",
    directions:           "Easy to follow directions.",
    required_methods:     [],
    required_equipment:   [],
    required_ingredients: [],
    required_subrecipes:  [],
    recipe_image:         "nobsc-mixed-drink",
    equipment_image:      "nobsc-mixed-drink-equipment",
    ingredients_image:    "nobsc-mixed-drink-ingredients",
    cooking_image:        "nobsc-mixed-drink-cooking",
  },
};

const initialProps = {
  authname: "Person",
  cuisines: [{id: 1, name: "American", nation: "America"}, {id: 2, name: "Japanese", nation: "Japan"}],
  equipment: [
    {id: 1, name: "Cutting Board", equipment_type_id: 2, owner_id: 1, equipment_type_name: "Preparing", description: "You need one.", image: "nobsc-cutting-board"},
    {id: 2, name: "Metal Spatula", equipment_type_id: 3, owner_id: 1, equipment_type_name: "Cooking",   description: "You need one.", image: "nobsc-metal-spatula"},
  ],
  ingredients: [
    {id: 1, brand: null, variety: "Granny Smith", name: "Apple",   ingredient_type_id: 12, owner_id: 1, ingredient_type_name: "Fruit",     description: "Energizing",    image: "nobsc-apple"},
    {id: 2, brand: null, variety: "Baby",         name: "Spinach", ingredient_type_id: 11, owner_id: 1, ingredient_type_name: "Vegetable", description: "Strengthening", image: "nobsc-spinach"}
  ],
  ingredientTypes:      [{id: 11, name: "Vegetable"}, {id: 12, name: "Fruit"}],
  measurements:         [{id: 1, name: "teaspoon"}, {id: 2, name: "Tablespoon"}],
  methods:              [{id: 1, name: "Steam"}, {id: 2, name: "Freeze"}],
  myFavoriteRecipes:    [],
  myPrivateEquipment:   [],
  myPrivateIngredients: [],
  myPrivateRecipes:     [],
  myPublicRecipes:      [],
  mySavedRecipes:       [],
  recipes:              [],
  recipeTypes:          [{id: 1, name: "Drink"}, {id: 2, name: "Appetizer"}],
  staffIsAuthenticated: false,  // test for this
  staffMessage:         "",
  theme:                "light",
  userMessage:          "Some message."
};

window.scrollTo = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

// TO DO: this needs more thorough tests
describe('NewRecipe', () => {

  describe('when creating', () => {

    describe('when ownership is private', () => {
      it('should not redirect to /dashboard if given no id', () => {
        mount(<NewRecipe editing={false} ownership="private" {...initialProps} />);

        expect(mockPush).not.toHaveBeenCalled();
      });
    });

    describe('when ownership is public', () => {
      it('should not redirect to /dashboard if given no id', () => {
        mount(<NewRecipe editing={false} ownership="public" {...initialProps} />);

        expect(mockPush).not.toHaveBeenCalled();
      });
    });

  });

  describe('when editing', () => {

    describe('when ownership is private', () => {
      it('should redirect to /dashboard if given no id', () => {
        mount(<NewRecipe editing={true} ownership="private" {...initialProps} />);

        expect(mockPush).toHaveBeenCalledWith("/dashboard");
      });
    });

    describe('when ownership is public', () => {
      it('should redirect to /dashboard if given no id', async () => {
        const wrapper = mount(<NewRecipe editing={true} ownership="public" {...initialProps} />);

        await act(async () => {
          Promise.resolve(() => {
            setImmediate(() => wrapper.update());
            expect(mockPush).toHaveBeenCalledWith("/dashboard");
          });
        });
      });
    });

  });

});