import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }           from '../../../config/api';
import { getMyEquipmentSaga } from '../../data/sagas';
import { systemMessage, systemMessageClear } from '../../../modules/shared/system-message/state';
import { actionTypes } from './state';
import type { CreateEquipment, UpdateEquipment, DeleteEquipment } from './state';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(CREATE_EQUIPMENT, createEquipmentSaga),
    takeEvery(UPDATE_EQUIPMENT, updateEquipmentSaga),
    takeEvery(DELETE_EQUIPMENT, deleteEquipmentSaga)
  ]);
}

export function* createEquipmentSaga(action: CreateEquipment) {
  let {
    equipment_type_id,
    equipment_name,
    description,
    image,
    fullImage,
    tinyImage
  } = action.equipmentInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subBucket: 'equipment'},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );
      
      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      image = fullName;
    }
    else image = 'nobsc-equipment-default';

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/private/equipment/create`,
      {
        equipmentInfo: {
          equipment_type_id,
          equipment_name,
          description,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updateEquipmentSaga(action: UpdateEquipment) {
  let {
    equipment_id,
    equipment_type_id,
    equipment_name,
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
        `${endpoint}/user/signed-url`,
        {subBucket: 'equipment'},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );
      
      yield call(
        [axios, axios.put],
        tinySignature,
        tinyImage,
        {headers: {'Content-Type': 'image/jpeg'}}
      );

      image = fullName;
    }
    else image = prevImage;

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/private/equipment/update`,
      {
        equipmentInfo: {
          equipment_id,
          equipment_type_id,
          equipment_name,
          description,
          prevImage,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(systemMessage(message));
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deleteEquipmentSaga({ equipment_id }: DeleteEquipment) {
  try {
    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/private/equipment/delete`,
      {
        withCredentials: true,
        data: {equipment_id}
      }
    );

    yield put(systemMessage(message));
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
