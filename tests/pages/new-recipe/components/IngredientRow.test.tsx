import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { IngredientRow } from '../../../../src/pages/new-recipe/components';
import { IIngredient } from '../../../../src/store/data/types';

const amount = 1;
const changeIngredientRow = jest.fn();
const id = 2;
const ingredients = [
  {
    id: 1,
    brand: null,
    variety: "Granny Smith",
    name: "Apple",
    ingredient_type_id: 12,
    owner_id: 1,
    ingredient_type_name: "Fruit",
    description: "Energizing",
    image: "nobsc-apple"
  },
  {
    id: 2,
    brand: null,
    variety: "Baby",
    name: "Spinach",
    ingredient_type_id: 11,
    owner_id: 1,
    ingredient_type_name: "Vegetable",
    description: "Strengthening",
    image: "nobsc-spinach"
  }
];
const ingredientTypes = [{id: 11, name: "Vegetable"}, {id: 12, name: "Fruit"}];
const measurementId = 1;
const measurements = [{id: 1, name: "teaspoon"}, {id: 2, name: "Tablespoon"}];
const myPrivateIngredients: IIngredient[] = [];
const removeIngredientRow = jest.fn();
const rowKey = "XYZ";
const type = 11;

let wrapper: ShallowWrapper;

describe('IngredientRow', () => {
  beforeEach(() => {
    wrapper = shallow(
      <IngredientRow
        amount={amount}
        changeIngredientRow={changeIngredientRow}
        id={id}
        ingredients={ingredients}
        ingredientTypes={ingredientTypes}
        measurementId={measurementId}
        measurements={measurements}
        myPrivateIngredients={myPrivateIngredients}
        removeIngredientRow={removeIngredientRow}
        rowKey={rowKey}
        type={type}
      />
    );
  });

  it('displays an amount input element', () => {
    expect(wrapper.find('input[name="amount"]')).toHaveLength(1);
  });

  it('displays a unit select element', () => {
    expect(wrapper.find('select[name="unit"]')).toHaveLength(1);
  });

  it('displays a type select element', () => {
    expect(wrapper.find('select[name="type"]')).toHaveLength(1);
  });

  it('displays an ingredient select element', () => {
    expect(wrapper.find('select[name="ingredient"]')).toHaveLength(1);
  });

  it('filters ingredient options by current type', () => {
    // should not have Apple option
    const ingredientOptions = wrapper.find('select[name="ingredient"]');
    expect(ingredientOptions.find('option[value="12"]')).toHaveLength(0);
  });

  it('displays a button element with text Remove', () => {
    expect(wrapper.find('.recipe-row__button--remove').text())
      .toEqual("Remove");
  });
});