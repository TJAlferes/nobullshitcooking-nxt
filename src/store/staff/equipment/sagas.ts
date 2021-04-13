import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetEquipmentsSaga } from '../../data/sagas';
import { staffMessage, staffMessageClear } from '../actions';
import {
  IStaffCreateNewEquipment,
  IStaffEditEquipment,
  IStaffDeleteEquipment
} from './types';

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

      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/equipment`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = fullName;

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

    yield put(staffMessage(message));

    yield call(dataGetEquipmentsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

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

      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/equipment`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': tinyImage.type}}
      );

      image = fullName;

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

    yield put(staffMessage(message));

    yield call(dataGetEquipmentsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

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

    yield put(staffMessage(message));

    yield call(dataGetEquipmentsSaga);

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}