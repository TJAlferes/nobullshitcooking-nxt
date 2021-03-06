import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Dashboard from '../../../src/pages/dashboard/index.page';
import { DashboardView } from '../../../src/pages/dashboard/view';

//const authUpdateLocalAvatar = jest.fn();
const userDeletePlan = jest.fn();
const userDeletePrivateEquipment = jest.fn();
const userDeletePrivateIngredient = jest.fn();
const userDeletePrivateRecipe = jest.fn();
const userDisownPublicRecipe = jest.fn();
const userSubmitAvatar = jest.fn();
const userUnfavoriteRecipe = jest.fn();
const userUnsaveRecipe = jest.fn();

const initialProps = {
  authname: "Person",
  //authUpdateLocalAvatar,
  //currentAvatar: "Person",
  message: "Some message.",
  myPlans: [],
  myFavoriteRecipes: [],
  myPrivateEquipment: [],
  myPrivateIngredients: [],
  myPrivateRecipes: [],
  myPublicRecipes: [],
  mySavedRecipes: [],
  theme: "light",
  userDeletePlan,
  userDeletePrivateEquipment,
  userDeletePrivateIngredient,
  userDeletePrivateRecipe,
  userDisownPublicRecipe,
  userSubmitAvatar,
  userUnfavoriteRecipe,
  userUnsaveRecipe
};

window.scrollTo = jest.fn();

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(
    <MemoryRouter>
      <Dashboard creatingPlan={false} editingId={null} {...initialProps} />
    </MemoryRouter>
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

// TO DO: finish testing!
describe('Dashboard', () => {
  it('should change tab to plans', () => {
    wrapper.find('button[name="plans"]').simulate('click');
    expect(wrapper.find(DashboardView).props().tab).toEqual('plans');
  });

  it('should change tab to recipes', () => {
    wrapper.find('button[name="recipes"]').simulate('click');
    expect(wrapper.find(DashboardView).props().tab).toEqual('recipes');
  });

  it('should change tab to ingredients', () => {
    wrapper.find('button[name="ingredients"]').simulate('click');
    expect(wrapper.find(DashboardView).props().tab).toEqual('ingredients');
  });

  it('should change tab to equipment', () => {
    wrapper.find('button[name="equipment"]').simulate('click');
    expect(wrapper.find(DashboardView).props().tab).toEqual('equipment');
  });
});