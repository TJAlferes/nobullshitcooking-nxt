import { all, takeEvery } from 'redux-saga/effects';

import { createEquipmentSaga, updateEquipmentSaga, deleteEquipmentSaga } from '../user/equipment/sagas';
import { actionTypes } from '../user/equipment/types';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(CREATE_EQUIPMENT, createEquipmentSaga),
    takeEvery(UPDATE_EQUIPMENT, updateEquipmentSaga),
    takeEvery(DELETE_EQUIPMENT, deleteEquipmentSaga)
  ]);
}