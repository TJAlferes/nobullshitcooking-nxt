import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getEquipmentsSaga } from '../../data/sagas';
import { staffMessage, staffMessageClear } from '../actions';
import type { ICreateNewEquipment, IEditEquipment, IDeleteEquipment } from './types';

export function* createNewEquipmentSaga(action: ICreateNewEquipment) {
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
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/signed-url/equipment`, {fileType: fullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}});

      image = fullName;
    }
    else image = 'nobsc-equipment-default';

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
    yield call(getEquipmentsSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* editEquipmentSaga(action: IEditEquipment) {
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
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/staff/signed-url/equipment`, {fileType: fullImage.type}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': fullImage.type}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': tinyImage.type}});

      image = fullName;
    }
    else image = prevImage;

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
    yield call(getEquipmentsSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* deleteEquipmentSaga(action: IDeleteEquipment) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/staff/equipment/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(staffMessage(message));
    yield call(getEquipmentsSaga);
  } catch(err) {
    yield put(staffMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(staffMessageClear());
}