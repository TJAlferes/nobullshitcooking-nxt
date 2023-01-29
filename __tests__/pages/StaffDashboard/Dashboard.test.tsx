import { mount } from 'enzyme';
import React from 'react';

import { StaffDashboard } from '../../../src/pages/StaffDashboard/Dashboard';

const staffDeleteEquipment = jest.fn();
const staffDeleteIngredient = jest.fn();
const staffDeleteRecipe = jest.fn();

const initialProps = {
  authname: "Person",
  editingId: null,
  equipment: [],
  ingredients: [],
  message: "Some message.",
  oneColumnATheme: "light",
  recipes: [],
  staffDeleteEquipment,
  staffDeleteIngredient,
  staffDeleteRecipe
};

window.scrollTo = jest.fn();

describe('StaffDashboard', () => {
  it('needs tests', () => {
    
  });
});