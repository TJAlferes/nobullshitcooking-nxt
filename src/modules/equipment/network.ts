import axios                                from 'axios';
import { all, call, delay, put, takeEvery } from 'redux-saga/effects';

import { endpoint }                                               from '../../config/api';
import { systemMessage, systemMessageClear }                      from '../shared/system/state';
import { getMyPrivateEquipmentWorker }                            from '../user/private/data/network';
import { actionTypes }                                            from './state';
import type { CreateEquipment, UpdateEquipment, DeleteEquipment } from './state';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export function* privateEquipmentWatcher() {
  yield all([
    takeEvery(CREATE_EQUIPMENT, createEquipmentWorker),
    takeEvery(UPDATE_EQUIPMENT, updateEquipmentWorker),
    takeEvery(DELETE_EQUIPMENT, deleteEquipmentWorker)
  ]);
}

export function* createEquipmentWorker({ ownership, equipment_upload }: CreateEquipment) {
  const { image } = equipment_upload;

  try {
    if (image.small && image.tiny) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/equipment/`},
        {withCredentials: true}
      );
      yield call(uploadImageToAWSS3, fullSignature, image.small);
      yield call(uploadImageToAWSS3, tinySignature, image.tiny);
      // TO DO: CHECK IF ABOVE OPERATIONS WERE SUCCESSFUL!!!
      image.image_filename = filename;
      image.small = null;
      image.tiny  = null;
    }

    const { data } = yield call(
      [axios, axios.post],
      `${endpoint}/user/${ownership}/equipment/create`,
      equipment_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    //yield call(getMyEquipmentWorker);  // put(getMyEquipment(ownership));
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* updateEquipmentWorker({ ownership, equipment_update_upload }: UpdateEquipment) {
  const { image } = equipment_update_upload;

  try {
    if (image.small && image.tiny) {
      const { data: { filename, fullSignature, tinySignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/signed-url`,
        {subfolder: `${ownership}/equipment/`},
        {withCredentials: true}
      );  // axios.put ???
      yield call(uploadImageToAWSS3, fullSignature, image.small);
      yield call(uploadImageToAWSS3, tinySignature, image.tiny);
      // TO DO: CHECK IF ABOVE OPERATIONS WERE SUCCESSFUL!!!
      image.image_filename = filename;
      image.small = null;
      image.tiny  = null;
    }

    const { data } = yield call(
      [axios, axios.put],
      `${endpoint}/user/${ownership}/equipment/update`,
      equipment_update_upload,
      {withCredentials: true}
    );

    yield put(systemMessage(data.message));
    //yield call(getMyEquipmentWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

export function* deleteEquipmentWorker({ ownership, equipment_id }: DeleteEquipment) {
  try {
    const { data } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/${ownership}/equipment/delete`,
      {withCredentials: true, data: {equipment_id}}
    );

    yield put(systemMessage(data.message));
    //yield call(getMyEquipmentWorker);
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
