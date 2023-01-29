import { createNewIngredient, editIngredient, deleteIngredient } from '../../../../src/store/staff/ingredient/actions';
import { actionTypes } from '../../../../src/store/staff/ingredient/types';

const { CREATE_NEW_INGREDIENT, EDIT_INGREDIENT, DELETE_INGREDIENT } = actionTypes;

const creatingInfo = {
  ingredientTypeId: 3,
  name:             "HOT Sauce",
  description:      "From Uncle Bob.",
  image:            "hot-sauce",
  fullImage:        null,
  tinyImage:        null
};
const editInfo = {
  id:        377,
  prevImage: "hot-sauce",
  ...creatingInfo
};

describe('createNewIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewIngredient(creatingInfo).type).toEqual(CREATE_NEW_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(createNewIngredient(creatingInfo).ingredientInfo).toEqual(creatingInfo);
  });
});

describe('editIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(editIngredient(editInfo).type).toEqual(EDIT_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(editIngredient(editInfo).ingredientInfo).toEqual(editInfo);
  });
});

describe('deleteIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(deleteIngredient(7).type).toEqual(DELETE_INGREDIENT);
  });

  it('returns the correct ingredientId', () => {
    expect(deleteIngredient(7).id).toEqual(7);
  });
});