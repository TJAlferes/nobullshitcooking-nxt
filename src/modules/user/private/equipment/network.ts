import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                          from '../../../../config/api';
import { systemMessage, systemMessageClear } from '../../../shared/system/state';
import { getMyEquipmentWorker }              from '../data/network';
import { actionTypes } from './state';
import type { CreatePrivateEquipment, UpdatePrivateEquipment, DeletePrivateEquipment } from './state';

const { CREATE_PRIVATE_EQUIPMENT, UPDATE_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = actionTypes;

export function* privateEquipmentWatcher() {
  yield all([
    takeEvery(CREATE_PRIVATE_EQUIPMENT, createPrivateEquipmentWorker),
    takeEvery(UPDATE_PRIVATE_EQUIPMENT, updatePrivateEquipmentWorker),
    takeEvery(DELETE_PRIVATE_EQUIPMENT, deletePrivateEquipmentWorker)
  ]);
}

export function* createPrivateEquipmentWorker(action: CreatePrivateEquipment) {
  let {
    equipment_type_id,
    equipment_name,
    notes,
    image,
    fullImage,
    tinyImage
  } = action.equipment_info;

  try {
    if (fullImage && tinyImage) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/equipment/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, fullImage);
      yield call(uploadImageToAWSS3, tinySignature, tinyImage);

      image = filename;
    }
    else image = 'nobsc-equipment-default';

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/equipment/create`,
      {
        equipmentInfo: {
          equipment_type_id,
          equipment_name,
          notes,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyEquipmentWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updatePrivateEquipmentWorker(action: UpdatePrivateEquipment) {
  let {
    equipment_id,
    equipment_type_id,
    equipment_name,
    notes,
    prevImage,
    image,
    fullImage,
    tinyImage
  } = action.equipment_info;

  try {
    if (fullImage && tinyImage) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: 'private/equipment/'},
        {withCredentials: true}
      );

      yield call(uploadImageToAWSS3, fullSignature, fullImage);
      yield call(uploadImageToAWSS3, tinySignature, tinyImage);

      image = filename;
    }
    else image = prevImage;

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/equipment/update`,
      {
        equipmentInfo: {
          equipment_id,
          equipment_type_id,
          equipment_name,
          notes,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    yield call(getMyEquipmentWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deletePrivateEquipmentWorker({ equipment_id }: DeletePrivateEquipment) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/equipment/delete`,
      {
        withCredentials: true,
        data: {equipment_id}
      }
    );

    yield put(systemMessage(data.message));
    yield call(getMyEquipmentWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
