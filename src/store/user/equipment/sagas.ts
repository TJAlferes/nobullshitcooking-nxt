import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                                       from '../../../utils/api';
import { getMyEquipmentSaga }                                             from '../../data/sagas';
import { userMessage, userMessageClear }                                  from '../actions';
import { actionTypes, CreateEquipment, UpdateEquipment, DeleteEquipment } from './types';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(CREATE_EQUIPMENT, createEquipmentSaga),
    takeEvery(UPDATE_EQUIPMENT, updateEquipmentSaga),
    takeEvery(DELETE_EQUIPMENT, deleteEquipmentSaga)
  ]);
}

export function* createEquipmentSaga(action: CreateEquipment) {
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
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* updateEquipmentSaga(action: UpdateEquipment) {
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
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* deleteEquipmentSaga(action: DeleteEquipment) {
  try {
    const { data: { message } } = yield call([axios, axios.delete], `${endpoint}/user/equipment/delete`, {withCredentials: true, data: {id: action.id}});

    yield put(userMessage(message));
    yield call(getMyEquipmentSaga);
  } catch(err) {
    yield put(userMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(userMessageClear());
}
