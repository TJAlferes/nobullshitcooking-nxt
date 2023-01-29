import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { staffMessage, staffMessageClear } from '../../../../src/store/staff/actions';
import { createNewRecipeSaga, deleteRecipeSaga, editRecipeSaga } from '../../../../src/store/staff/recipe/sagas';
import { actionTypes } from '../../../../src/store/staff/recipe/types';

const { CREATE_NEW_RECIPE, DELETE_RECIPE, EDIT_RECIPE } = actionTypes;

const recipeFullImage =      new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});  // TO DO: IMPORTANT: Securely set type across system
const recipeThumbImage =     new File([(new Blob)], "resizedThumb", {type: "image/jpeg"});
const recipeTinyImage =      new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});
const equipmentFullImage =   new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const ingredientsFullImage = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const cookingFullImage =     new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});

const creatingInfo = {
  ownership:        "private",
  recipeTypeId:     1,
  cuisineId:        1,
  title:            "My Secret Recipe",
  description:      "Don't worry about it.",
  directions:       "Do nothing.",
  methods:          [{id: 1}, {id: 3}],
  equipment:        [{amount: 1, id: 1}],
  ingredients:      [{amount: 1, measurementId: 1, id: 1}],
  subrecipes:       [],
  recipeImage:      null,
  recipeFullImage,
  recipeThumbImage,
  recipeTinyImage,
  equipmentImage:   null,
  equipmentFullImage,
  ingredientsImage: null,
  ingredientsFullImage,
  cookingImage:     null,
  cookingFullImage
};
const editInfo = {
  id:                   888,
  recipePrevImage:      "nobsc-recipe-default",
  equipmentPrevImage:   "nobsc-recipe-equipment-default",
  ingredientsPrevImage: "nobsc-recipe-ingredients-default",
  cookingPrevImage:     "nobsc-recipe-cooking-default",
  ...creatingInfo
};

describe('createNewRecipeSaga', () => {
  const action = {type: CREATE_NEW_RECIPE, recipeInfo: creatingInfo};

  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      thumbSignature: "signedUrlString-thumb",
      tinySignature: "signedUrlString-tiny",
      fullName: "recipeUrlString"
    }
  };
  const res2 = res1;
  const res3 = res1;
  const res4 = res1;

  const {
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    methods,
    equipment,
    ingredients,
    subrecipes,
    recipeFullImage,
    recipeThumbImage,
    recipeTinyImage,
    equipmentFullImage,
    ingredientsFullImage,
    cookingFullImage
  } = action.recipeInfo;

  it('should dispatch succeeded', () => {
    const iter = createNewRecipeSaga(action);
    const res = {data: {message: 'Recipe created.'}};

    // 1
    
    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe`,
      {fileType: recipeFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      recipeFullImage,
      {headers: {'Content-Type': recipeFullImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.thumbSignature,
      recipeThumbImage,
      {headers: {'Content-Type': recipeThumbImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      recipeTinyImage,
      {headers: {'Content-Type': recipeTinyImage.type}}
    ));

    // 2

    /*
      We're using JSON.stringify() here because Jest kept bugging out.
      See https://github.com/facebook/jest/issues/8475 for more info.
      Why it was only doing this here, only the gods know.
    */
    expect(JSON.stringify(iter.next().value))
    .toEqual(JSON.stringify(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-equipment`,
      {fileType: equipmentFullImage.type},
      {withCredentials: true}
    )));

    expect(iter.next(res2).value)
    .toEqual(call(
      [axios, axios.put],
      res2.data.fullSignature,
      equipmentFullImage,
      {headers: {'Content-Type': equipmentFullImage.type}}
    ));

    // 3

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-ingredients`,
      {fileType: ingredientsFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res3).value)
    .toEqual(call(
      [axios, axios.put],
      res3.data.fullSignature,
      ingredientsFullImage,
      {headers: {'Content-Type': ingredientsFullImage.type}}
    ));

    // 4

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-cooking`,
      {fileType: cookingFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res4).value)
    .toEqual(call(
      [axios, axios.put],
      res4.data.fullSignature,
      cookingFullImage,
      {headers: {'Content-Type': cookingFullImage.type}}
    ));

    //

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/recipe/create`,
      {
        recipeInfo: {
          ownership,
          recipeTypeId,
          cuisineId,
          title,
          description,
          directions,
          methods,
          equipment,
          ingredients,
          subrecipes,
          recipeImage: "recipeUrlString",
          equipmentImage: "recipeUrlString",
          ingredientsImage: "recipeUrlString",
          cookingImage: "recipeUrlString"
        }
      },
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = createNewRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next(res1);

    iter.next();
    iter.next(res2);

    iter.next();
    iter.next(res3);

    iter.next();
    iter.next(res4);

    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = createNewRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('deleteRecipeSaga', () => {
  const action = {type: DELETE_RECIPE, id: 4};

  it('should dispatch succeeded', () => {
    const iter = deleteRecipeSaga(action);
    const res = {data: {message: 'Recipe deleted.'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.delete],
      `${endpoint}/staff/recipe/delete`,
      {withCredentials: true, data: {id: action.id}}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = deleteRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = deleteRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('the editRecipeSaga', () => {
  const action = {type: EDIT_RECIPE, recipeInfo: editInfo};
  
  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      thumbSignature: "signedUrlString-thumb",
      tinySignature: "signedUrlString-tiny",
      fullName: "recipeUrlString"
    }
  };
  const res2 = res1;
  const res3 = res1;
  const res4 = res1;

  const {
    id,
    ownership,
    recipeTypeId,
    cuisineId,
    title,
    description,
    directions,
    methods,
    equipment,
    ingredients,
    subrecipes,
    recipeFullImage,
    recipePrevImage,
    recipeThumbImage,
    recipeTinyImage,
    equipmentFullImage,
    equipmentPrevImage,
    ingredientsFullImage,
    ingredientsPrevImage,
    cookingFullImage,
    cookingPrevImage
  } = action.recipeInfo;

  it('should dispatch succeeded', () => {
    const iter = editRecipeSaga(action);
    const res = {data: {message: 'Recipe updated.'}};

    // 1

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe`,
      {fileType: recipeFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      recipeFullImage,
      {headers: {'Content-Type': recipeFullImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.thumbSignature,
      recipeThumbImage,
      {headers: {'Content-Type': recipeThumbImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      recipeTinyImage,
      {headers: {'Content-Type': recipeTinyImage.type}}
    ));

    // 2

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-equipment`,
      {fileType: equipmentFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res2).value)
    .toEqual(call(
      [axios, axios.put],
      res2.data.fullSignature,
      equipmentFullImage,
      {headers: {'Content-Type': equipmentFullImage.type}}
    ));

    // 3

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-ingredients`,
      {fileType: ingredientsFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res3).value)
    .toEqual(call(
      [axios, axios.put],
      res3.data.fullSignature,
      ingredientsFullImage,
      {headers: {'Content-Type': ingredientsFullImage.type}}
    ));

    // 4

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/recipe-cooking`,
      {fileType: cookingFullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res4).value)
    .toEqual(call(
      [axios, axios.put],
      res4.data.fullSignature,
      cookingFullImage,
      {headers: {'Content-Type': cookingFullImage.type}}
    ));

    //

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/staff/recipe/update`,
      {
        recipeInfo: {
          id,
          ownership,
          recipeTypeId,
          cuisineId,
          title,
          description,
          directions,
          methods,
          equipment,
          ingredients,
          subrecipes,
          recipeImage: "recipeUrlString",
          recipePrevImage,
          equipmentImage: "recipeUrlString",
          equipmentPrevImage,
          ingredientsImage: "recipeUrlString",
          ingredientsPrevImage,
          cookingImage: "recipeUrlString",
          cookingPrevImage
        }
      },
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = editRecipeSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next(res1);

    iter.next();
    iter.next(res2);

    iter.next();
    iter.next(res3);

    iter.next();
    iter.next(res4);

    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = editRecipeSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});