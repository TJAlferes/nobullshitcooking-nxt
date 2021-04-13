import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetMyPrivateEquipmentsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserCreateNewPrivateEquipment,
  IUserEditPrivateEquipment,
  IUserDeletePrivateEquipment
} from './types';

export function* userCreateNewPrivateEquipmentSaga(
  action: IUserCreateNewPrivateEquipment
) {
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
        `${endpoint}/user/get-signed-url/equipment`,
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
      `${endpoint}/user/equipment/create`,
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

    yield put(userMessage(message));

    yield call(dataGetMyPrivateEquipmentsSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userEditPrivateEquipmentSaga(
  action: IUserEditPrivateEquipment
) {
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
        `${endpoint}/user/get-signed-url/equipment`,
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
      `${endpoint}/user/equipment/update`,
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

    yield put(userMessage(message));

    yield call(dataGetMyPrivateEquipmentsSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeletePrivateEquipmentSaga(
  action: IUserDeletePrivateEquipment
) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/equipment/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(userMessage(message));

    yield call(dataGetMyPrivateEquipmentsSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}