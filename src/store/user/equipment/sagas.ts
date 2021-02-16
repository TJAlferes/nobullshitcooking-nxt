import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserCreateNewPrivateEquipment,
  IUserEditPrivateEquipment,
  IUserDeletePrivateEquipment
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

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

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/equipment`,
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

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/equipment`,
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

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}