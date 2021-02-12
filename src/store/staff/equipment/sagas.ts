import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { staffMessageClear } from '../actions';
import {
  staffCreateNewEquipmentFailed,
  staffEditEquipmentFailed,
  staffDeleteEquipmentFailed
} from './actions';
import {
  IStaffCreateNewEquipment,
  IStaffEditEquipment,
  IStaffDeleteEquipment
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function* staffCreateNewEquipmentSaga(action: IStaffCreateNewEquipment) {

  let {
    equipmentTypeId,
    name,
    description,
    image,
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  try {

    if (fullImage && tinyImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/equipment`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = 'nobsc-equipment-default';

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/staff/equipment/create`,
      {
        equipmentInfo: {
          equipmentTypeId,
          name,
          description,
          image
        }
      },
      {withCredentials: true}
    );

    if (message == 'Equipment created.') yield put(staffMessage(message));
    else yield put(staffCreateNewEquipmentFailed(message));

  } catch(err) {

    yield put(staffCreateNewEquipmentFailed('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffEditEquipmentSaga(action: IStaffEditEquipment) {
  let {
    id,
    equipmentTypeId,
    name,
    description,
    prevImage,
    image,
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  try {

    if (fullImage && tinyImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/equipment`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = prevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/staff/equipment/update`,
      {
        equipmentInfo: {
          id,
          equipmentTypeId,
          name,
          description,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    if (message === 'Equipment updated.') yield put(staffMessage(message));
    else yield put(staffEditEquipmentFailed(message));

  } catch(err) {

    yield put(staffEditEquipmentFailed('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffDeleteEquipmentSaga(action: IStaffDeleteEquipment) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/staff/equipment/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    if (message === 'Equipment deleted.')  yield put(staffMessage(message));
    else yield put(staffDeleteEquipmentFailed(message));

  } catch(err) {

    yield put(staffDeleteEquipmentFailed('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}