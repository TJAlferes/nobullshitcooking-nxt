import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../../src/config/NOBSCAPI';
import {
  staffMessage,
  staffMessageClear
} from '../../../../src/store/staff/actions';
import {
  staffCreateNewEquipmentSaga,
  staffEditEquipmentSaga,
  staffDeleteEquipmentSaga
} from '../../../../src/store/staff/equipment/sagas';
import { actionTypes } from '../../../../src/store/staff/equipment/types';

const {
  STAFF_CREATE_NEW_EQUIPMENT,
  STAFF_EDIT_EQUIPMENT,
  STAFF_DELETE_EQUIPMENT
} = actionTypes;

const fullImage = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyImage = new File([(new Blob)], "resizedTiny", {type: "image/jpeg"});

const creatingEquipmentInfo = {
  equipmentTypeId: 3,
  name: "Metal Spatula",
  description: "It works.",
  image: "nobsc-metal-spatula",
  fullImage,
  tinyImage
};

const editingEquipmentInfo = {
  id: 1,
  equipmentTypeId: 3,
  name: "Metal Spatula",
  description: "It works.",
  prevImage: "nobsc-metal-spatula",
  image: "nobsc-metal-spatula",
  fullImage,
  tinyImage
};

describe('userCreateNewEquipmentSaga', () => {
  const action = {
    type: STAFF_CREATE_NEW_EQUIPMENT,
    equipmentInfo: creatingEquipmentInfo
  };
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
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  it('should dispatch succeeded', () => {
    const iterator = staffCreateNewEquipmentSaga(action);
    const res = {data: {message: 'Equipment created.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/equipment`,
      {fileType: fullImage.type},
      {withCredentials: true}
    ));

    expect(iterator.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      fullImage,
      {headers: {'Content-Type': fullImage.type}}
    ));

    expect(iterator.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      tinyImage,
      {headers: {'Content-Type': tinyImage.type}}
    ));

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/equipment/create`,
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

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = staffCreateNewEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();
    iterator.next(res1);
    iterator.next(res1);
    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = staffCreateNewEquipmentSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('staffEditEquipmentSaga', () => {
  const action = {
    type: STAFF_EDIT_EQUIPMENT,
    equipmentInfo: editingEquipmentInfo
  };
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
    const iterator = staffEditEquipmentSaga(action);
    const res = {data: {message: 'Equipment updated.'}};

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.post],
      `${endpoint}/staff/get-signed-url/equipment`,
      {fileType: fullImage.type},
      {withCredentials: true}
    ));

    expect(iterator.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.fullSignature,
      fullImage,
      {headers: {'Content-Type': fullImage.type}}
    ));

    expect(iterator.next(res1).value)
    .toEqual(call(
      [axios, axios.put],
      res1.data.tinySignature,
      tinyImage,
      {headers: {'Content-Type': tinyImage.type}}
    ));

    expect(iterator.next().value)
    .toEqual(call(
      [axios, axios.put],
      `${endpoint}/staff/equipment/update`,
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

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = staffEditEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();
    iterator.next(res1);
    iterator.next(res1);
    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = staffEditEquipmentSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});

describe('staffDeleteEquipmentSaga', () => {
  const action = {type: STAFF_DELETE_EQUIPMENT, id: 4};

  it('should dispatch succeeded', () => {
    const iterator = staffDeleteEquipmentSaga(action);
    const res = {data: {message: 'Equipment deleted.'}};

    expect(iterator.next().value).toEqual(call(
      [axios, axios.delete],
      `${endpoint}/staff/equipment/delete`,
      {withCredentials: true, data: {id: action.id}}
    ));

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed', () => {
    const iterator = staffDeleteEquipmentSaga(action);
    const res = {data: {message: 'Oops.'}};

    iterator.next();

    expect(iterator.next(res).value)
      .toEqual(put(staffMessage(res.data.message)));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if thrown', () => {
    const iterator = staffDeleteEquipmentSaga(action);

    iterator.next();

    expect(iterator.throw('error').value)
      .toEqual(put(staffMessage('An error occurred. Please try again.')));
    expect(iterator.next().value).toEqual(delay(4000));
    expect(iterator.next().value).toEqual(put(staffMessageClear()));
    expect(iterator.next()).toEqual({done: true, value: undefined});
  });
});