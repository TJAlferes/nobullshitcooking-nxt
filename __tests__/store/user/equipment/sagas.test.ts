import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { userMessage, userMessageClear } from '../../../../src/store/user/actions';
import { createNewPrivateEquipmentSaga, editPrivateEquipmentSaga, deletePrivateEquipmentSaga } from '../../../../src/store/user/equipment/sagas';
import { actionTypes } from '../../../../src/store/user/equipment/types';

const { CREATE_NEW_PRIVATE_EQUIPMENT, EDIT_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = actionTypes;

const fullImage = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyImage = new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});

const creatingInfo = {
  equipmentTypeId: 3,
  name:            "My Teapot",
  description:     "From grandmother.",
  image:           "my-teapot",
  fullImage,
  tinyImage
};
const editInfo = {
  id:        377,
  prevImage: "my-teapot",
  ...creatingInfo
};

describe('createNewPrivateEquipmentSaga', () => {
  const action = {type: CREATE_NEW_PRIVATE_EQUIPMENT, equipmentInfo: creatingInfo};
  const res1 = {data: {fullSignature: "signedUrlString", tinySignature: "signedUrlString-tiny", fullName: "equipmentUrlString"}};
  const { equipmentTypeId, name, description, fullImage, tinyImage } = action.equipmentInfo;

  it('should dispatch succeeded', () => {
    const iter = createNewPrivateEquipmentSaga(action);
    const res = {data: {message: 'Equipment created.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/get-signed-url/equipment`,
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
      `${endpoint}/user/equipment/create`,
      {
        equipmentInfo: {
          equipmentTypeId,
          name,
          description,
          image: "equipmentUrlString"
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
    const iter = createNewPrivateEquipmentSaga(action);
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
    const iter = createNewPrivateEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('editPrivateEquipmentSaga', () => {
  const action = {type: EDIT_PRIVATE_EQUIPMENT, equipmentInfo: editInfo};
  const res1 = {data: {fullSignature: "signedUrlString", tinySignature: "signedUrlString-tiny", fullName: "equipmentUrlString"}};
  const { id, equipmentTypeId, name, description, prevImage, fullImage, tinyImage } = action.equipmentInfo;

  it('should dispatch succeeded', () => {
    const iter = editPrivateEquipmentSaga(action);
    const res = {data: {message: 'Equipment updated.'}};

    expect(iter.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/get-signed-url/equipment`,
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
      `${endpoint}/user/equipment/update`,
      {
        equipmentInfo: {
          id,
          equipmentTypeId,
          name,
          description,
          prevImage,
          image: "equipmentUrlString"
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
    const iter = editPrivateEquipmentSaga(action);
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
    const iter = editPrivateEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('deletePrivateEquipmentSaga', () => {
  const action = {type: DELETE_PRIVATE_EQUIPMENT, id: 4};

  it('should dispatch succeeded', () => {
    const iter = deletePrivateEquipmentSaga(action);
    const res = {data: {message: 'Equipment deleted.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.delete], `${endpoint}/user/equipment/delete`, {withCredentials: true, data: {id: action.id}}));

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = deletePrivateEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(userMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = deletePrivateEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(userMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(userMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});