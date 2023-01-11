import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import { staffMessage, staffMessageClear } from '../../../../src/store/staff/actions';
import { createNewEquipmentSaga, editEquipmentSaga, deleteEquipmentSaga } from '../../../../src/store/staff/equipment/sagas';
import { actionTypes } from '../../../../src/store/staff/equipment/types';

const { CREATE_NEW_EQUIPMENT, EDIT_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

const fullImage = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyImage = new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});

const creatingInfo = {
  equipmentTypeId: 3,
  name:            "Metal Spatula",
  description:     "It works.",
  image:           "nobsc-metal-spatula",
  fullImage,
  tinyImage
};
const editInfo = {
  id:        1,
  prevImage: "nobsc-metal-spatula",
  ...creatingInfo
};

describe('userCreateNewEquipmentSaga', () => {
  const action = {type: CREATE_NEW_EQUIPMENT, equipmentInfo: creatingInfo};
  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      tinySignature: "signedUrlString-tiny",
      fullName: "equipmentUrlString"
    }
  };
  const {
    equipmentTypeId,
    name,
    description,
    image,
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  it('should dispatch succeeded', () => {
    const iter = createNewEquipmentSaga(action);
    const res = {data: {message: 'Equipment created.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.post], `${endpoint}/staff/get-signed-url/equipment`, {fileType: fullImage.type}, {withCredentials: true}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}}));

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/equipment/create`,
      {equipmentInfo: {
        equipmentTypeId,
        name,
        description,
        image: "equipmentUrlString"
      }},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = createNewEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = createNewEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('editEquipmentSaga', () => {
  const action = {type: EDIT_EQUIPMENT, equipmentInfo: editInfo};
  const res1 = {
    data: {
      fullSignature: "signedUrlString",
      tinySignature: "signedUrlString-tiny",
      fullName: "equipmentUrlString"
    }
  };
  const {
    id,
    equipmentTypeId,
    name,
    description,
    prevImage,
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  it('should dispatch succeeded', () => {
    const iter = editEquipmentSaga(action);
    const res = {data: {message: 'Equipment updated.'}};

    expect(iter.next().value)
      .toEqual(call([axios, axios.post], `${endpoint}/staff/get-signed-url/equipment`, {fileType: fullImage.type}, {withCredentials: true}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}}));

    expect(iter.next(res1).value)
      .toEqual(call([axios, axios.put], res1.data.tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}}));

    expect(iter.next().value).toEqual(call(
      [axios, axios.put],
      `${endpoint}/staff/equipment/update`,
      {equipmentInfo: {
        id,
        equipmentTypeId,
        name,
        description,
        prevImage,
        image: "equipmentUrlString"
      }},
      {withCredentials: true}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = editEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();
    iter.next(res1);
    iter.next(res1);
    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = editEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('deleteEquipmentSaga', () => {
  const action = {type: DELETE_EQUIPMENT, id: 4};

  it('should dispatch succeeded', () => {
    const iter = deleteEquipmentSaga(action);
    const res = {data: {message: 'Equipment deleted.'}};

    expect(iter.next().value).toEqual(call(
      [axios, axios.delete],
      `${endpoint}/staff/equipment/delete`,
      {withCredentials: true, data: {id: action.id}}
    ));

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iter = deleteEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iter.next();

    expect(iter.next(res).value).toEqual(put(staffMessage(res.data.message)));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iter = deleteEquipmentSaga(action);

    iter.next();

    expect(iter.throw('error').value).toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iter.next().value).toEqual(delay(4000));
    expect(iter.next().value).toEqual(put(staffMessageClear()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});