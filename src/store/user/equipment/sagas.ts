import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { getMyPrivateEquipmentsSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import type { ICreateNewPrivateEquipment, IEditPrivateEquipment, IDeletePrivateEquipment } from './types';

export function* createNewPrivateEquipmentSaga(action: ICreateNewPrivateEquipment) {
  let { equipmentTypeId, name, description, image, fullImage, tinyImage } = action.equipmentInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'equipment'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': 'image/jpeg'}});

      image = fullName;
    }
    else image = 'nobsc-equipment-default';

    const { data: { message } } =
      yield call([axios, axios.post], `${endpoint}/user/equipment/create`, {equipmentInfo: {equipmentTypeId, name, description, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPrivateEquipmentsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* editPrivateEquipmentSaga(action: IEditPrivateEquipment) {
  let { id, equipmentTypeId, name, description, prevImage, image, fullImage, tinyImage } = action.equipmentInfo;

  try {
    if (fullImage && tinyImage) {
      const { data: { fullName, fullSignature, tinySignature } } =
        yield call([axios, axios.post], `${endpoint}/user/signed-url`, {subBucket: 'equipment'}, {withCredentials: true});

      yield call([axios, axios.put], fullSignature, fullImage, {headers: {'Content-Type': 'image/jpeg'}});
      yield call([axios, axios.put], tinySignature, tinyImage, {headers: {'Content-Type': 'image/jpeg'}});

      image = fullName;
    }
    else image = prevImage;

    const { data: { message } } =
      yield call([axios, axios.put], `${endpoint}/user/equipment/update`, {equipmentInfo: {id, equipmentTypeId, name, description, prevImage, image}}, {withCredentials: true});

    yield put(userMessage(message));
    yield call(getMyPrivateEquipmentsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deletePrivateEquipmentSaga(action: IDeletePrivateEquipment) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/equipment/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyPrivateEquipmentsSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}