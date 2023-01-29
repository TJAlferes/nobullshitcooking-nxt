import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import { createNewPrivateIngredientSaga, editPrivateIngredientSaga, deletePrivateIngredientSaga } from '../../../../src/store/user/ingredient/sagas';
import { actionTypes } from '../../../../src/store/user/ingredient/types';

const { CREATE_NEW_PRIVATE_INGREDIENT, EDIT_PRIVATE_INGREDIENT, DELETE_PRIVATE_INGREDIENT } = actionTypes;

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

describe('createNewPrivateIngredientSaga', () => {
  const action = {type: CREATE_NEW_PRIVATE_INGREDIENT, ingredientInfo: creatingInfo};
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
    const iter = createNewPrivateIngredientSaga(action);
    const res = {data: {message: 'Ingredient created.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.post], `${endpoint}/user/get-signed-url/ingredient`, {fileType: fullImage.type}, {withCredentials: true}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}}));

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/create`,
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

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = createNewPrivateIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = createNewPrivateIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('editPrivateIngredientSaga', () => {
  const action = {type: EDIT_PRIVATE_INGREDIENT, ingredientInfo: editInfo};
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
    const iter = editPrivateIngredientSaga(action);
    const res = {data: {message: 'Ingredient updated.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.post], `${endpoint}/user/get-signed-url/ingredient`, {fileType: fullImage.type}, {withCredentials: true}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}}));

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/user/ingredient/update`,
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

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = editPrivateIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = editPrivateIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('deletePrivateIngredientSaga', () => {
  const action = {type: DELETE_PRIVATE_INGREDIENT, id: 4};

  it('should dispatch succeeded', () => {
    const iter = deletePrivateIngredientSaga(action);
    const res = {data: {message: 'Ingredient deleted.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.delete], `${endpoint}/user/ingredient/delete`, {withCredentials: true, data: {id: action.id}}));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = deletePrivateIngredientSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = deletePrivateIngredientSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});