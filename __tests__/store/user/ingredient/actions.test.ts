import { createNewPrivateIngredient, editPrivateIngredient, deletePrivateIngredient } from '../../../../src/store/user/ingredient/actions';
import { actionTypes } from '../../../../src/store/user/ingredient/types';

const { CREATE_NEW_PRIVATE_INGREDIENT, EDIT_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = actionTypes;

const creatingInfo = {
  ingredientTypeId: 3,
  name:             "HOT Sauce",
  description:      "From Uncle Bob.",
  image:            "hot-sauce",
  fullImage:        null,
  tinyImage:        null
};
const editingInfo = {
  id:        377,
  prevImage: "hot-sauce",
  ...creatingInfo
};

describe('createNewPrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewPrivateIngredient(creatingInfo).type).toEqual(CREATE_NEW_PRIVATE_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(createNewPrivateIngredient(creatingInfo).ingredientInfo).toEqual(creatingInfo);
  });
});

describe('editPrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(editPrivateIngredient(editingInfo).type).toEqual(EDIT_PRIVATE_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(editPrivateIngredient(editingInfo).ingredientInfo).toEqual(editingInfo);
  });
});

describe('deletePrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(deletePrivateIngredient(7).type).toEqual(DELETE_PRIVATE_INGREDIENT);
  });

  it('returns the correct id', () => {
    expect(deletePrivateIngredient(7).id).toEqual(7);
  });
});