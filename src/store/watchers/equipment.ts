import { all, takeEvery } from 'redux-saga/effects';

import { createNewPrivateEquipmentSaga, editPrivateEquipmentSaga, deletePrivateEquipmentSaga } from '../user/equipment/sagas';
import { actionTypes as userEquipmentActionTypes } from '../user/equipment/types';

const { CREATE_NEW_PRIVATE_EQUIPMENT, EDIT_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = userEquipmentActionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(CREATE_NEW_PRIVATE_EQUIPMENT, createNewPrivateEquipmentSaga),
    takeEvery(EDIT_PRIVATE_EQUIPMENT,       editPrivateEquipmentSaga),
    takeEvery(DELETE_PRIVATE_EQUIPMENT,     deletePrivateEquipmentSaga)
  ]);
}