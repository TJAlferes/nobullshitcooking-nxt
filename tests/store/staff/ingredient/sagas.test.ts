import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import {
  staffMessage,
  staffMessageClear
} from '../../../../src/store/staff/actions';
import {
  createNewIngredientSaga,
  editIngredientSaga,
  deleteIngredientSaga,
} from '../../../../src/store/staff/ingredient/sagas';
import { actionTypes } from '../../../../src/store/staff/ingredient/types';

const {
  CREATE_NEW_INGREDIENT,
  EDIT_INGREDIENT,
  DELETE_INGREDIENT
} = actionTypes;

const fullImage = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyImage = new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});

const creatingInfo = {
  ingredientTypeId: 3,
  name: "HOT Sauce",
  description: "From Uncle Bob.",
  image: "hot-sauce",
  fullImage,
  tinyImage
};
const editInfo = {
  id: 377,
  prevImage: "hot-sauce",
  ...creatingInfo
};

describe('createNewIngredientSaga', () => {
  const action = {
    type: CREATE_NEW_INGREDIENT,
    ingredientInfo: creatingInfo
  };
  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      tinySignature: "signedUrlString-tiny",
      fullName: "ingredientUrlString"
    }
  };
  const {
    ingredientTypeId,
    name,
    description,
    fullImage,
    tinyImage
  } = action.ingredientInfo;

  it('should dispatch succeeded', () => {
    const iter = createNewIngredientSaga(action);
    const res = {data: {message: 'Ingredient created.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/ingredient`,
      {fileType: fullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      fullImage,
      {headers: {'Content-Type': fullImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      tinyImage,
      {headers: {'Content-Type': tinyImage.type}}
    ));

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/ingredient/create`,
      {
        ingredientInfo: {
          ingredientTypeId,
          name,
          description,
          image: "ingredientUrlString"
        }
      },
      {withCredentials: true}
    ));

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = createNewIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = createNewIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('editIngredientSaga', () => {
  const action = {
    type: EDIT_INGREDIENT,
    ingredientInfo: editInfo
  };
  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      tinySignature: "signedUrlString-tiny",
      fullName: "ingredientUrlString"
    }
  };
  const {
    id,
    ingredientTypeId,
    name,
    description,
    prevImage,
    fullImage,
    tinyImage
  } = action.ingredientInfo;

  it('should dispatch succeeded', () => {
    const iter = editIngredientSaga(action);
    const res = {data: {message: 'Ingredient updated.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/ingredient`,
      {fileType: fullImage.type},
      {withCredentials: true}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      fullImage,
      {headers: {'Content-Type': fullImage.type}}
    ));

    expect(iter.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      tinyImage,
      {headers: {'Content-Type': tinyImage.type}}
    ));

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/staff/ingredient/update`,
      {
        ingredientInfo: {
          id,
          ingredientTypeId,
          name,
          description,
          prevImage,
          image: "ingredientUrlString"
        }
      },
      {withCredentials: true}
    ));

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = editIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = editIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('deleteIngredientSaga', () => {
  const action = {type: DELETE_INGREDIENT, id: 4};

  it('should dispatch succeeded', () => {
    const iter = deleteIngredientSaga(action);
    const res = {data: {message: 'Ingredient deleted.'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.delete],
      `${endpoint}/staff/ingredient/delete`,
      {withCredentials: true, data: {id: action.id}}
    ));

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = deleteIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = deleteIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});