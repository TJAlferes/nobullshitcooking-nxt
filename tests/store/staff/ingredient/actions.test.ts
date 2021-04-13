import {
  staffCreateNewIngredient,
  staffEditIngredient,
  staffDeleteIngredient
} from '../../../../src/store/staff/ingredient/actions';
import { actionTypes } from '../../../../src/store/staff/ingredient/types';

const {
  STAFF_CREATE_NEW_INGREDIENT,
  STAFF_EDIT_INGREDIENT,
  STAFF_DELETE_INGREDIENT
} = actionTypes;

const creatingIngredientInfo = {
  ingredientTypeId: 3,
  name: "HOT Sauce",
  description: "From Uncle Bob.",
  image: "hot-sauce",
  fullImage: null,
  tinyImage: null
};
const editingIngredientInfo = {
  ingredientTypeId: 3,
  name: "HOT Sauce",
  description: "From Uncle Bob.",
  image: "hot-sauce",
  fullImage: null,
  tinyImage: null,
  id: 377,
  prevImage: "hot-sauce"
};

describe('staffCreateNewIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(staffCreateNewIngredient(creatingIngredientInfo).type)
      .toEqual(STAFF_CREATE_NEW_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(staffCreateNewIngredient(creatingIngredientInfo).ingredientInfo)
      .toEqual(creatingIngredientInfo);
  });
});

describe('staffEditIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(staffEditIngredient(editingIngredientInfo).type)
      .toEqual(STAFF_EDIT_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(staffEditIngredient(editingIngredientInfo).ingredientInfo)
      .toEqual(editingIngredientInfo);
  });
});

describe('staffDeleteIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(staffDeleteIngredient(7).type).toEqual(STAFF_DELETE_INGREDIENT);
  });

  it('returns the correct ingredientId', () => {
    expect(staffDeleteIngredient(7).id).toEqual(7);
  });
});