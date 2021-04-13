import {
  userCreateNewPrivateIngredient,
  userEditPrivateIngredient,
  userDeletePrivateIngredient
} from '../../../../src/store/user/ingredient/actions';
import { actionTypes } from '../../../../src/store/user/ingredient/types';

const {
  USER_CREATE_NEW_PRIVATE_INGREDIENT,
  USER_EDIT_PRIVATE_INGREDIENT,
  USER_DELETE_PRIVATE_INGREDIENT
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

describe('userCreateNewPrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewPrivateIngredient(creatingIngredientInfo).type)
      .toEqual(USER_CREATE_NEW_PRIVATE_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(
      userCreateNewPrivateIngredient(creatingIngredientInfo).ingredientInfo
    ).toEqual(creatingIngredientInfo);
  });
});

describe('userEditPrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditPrivateIngredient(editingIngredientInfo).type)
      .toEqual(USER_EDIT_PRIVATE_INGREDIENT);
  });

  it('returns the correct ingredientInfo', () => {
    expect(userEditPrivateIngredient(editingIngredientInfo).ingredientInfo)
      .toEqual(editingIngredientInfo);
  });
});

describe('userDeletePrivateIngredient action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeletePrivateIngredient(7).type)
      .toEqual(USER_DELETE_PRIVATE_INGREDIENT);
  });

  it('returns the correct id', () => {
    expect(userDeletePrivateIngredient(7).id).toEqual(7);
  });
});