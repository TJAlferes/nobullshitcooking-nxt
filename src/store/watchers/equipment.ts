import { all, takeEvery } from 'redux-saga/effects';

import { createNewEquipmentSaga, editEquipmentSaga, deleteEquipmentSaga } from '../staff/equipment/sagas';
import { actionTypes as staffEquipmentActionTypes } from '../staff/equipment/types';
import { createNewPrivateEquipmentSaga, editPrivateEquipmentSaga, deletePrivateEquipmentSaga } from '../user/equipment/sagas';
import { actionTypes as userEquipmentActionTypes } from '../user/equipment/types';

const { CREATE_NEW_EQUIPMENT, EDIT_EQUIPMENT, DELETE_EQUIPMENT } =                         staffEquipmentActionTypes;
const { CREATE_NEW_PRIVATE_EQUIPMENT, EDIT_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = userEquipmentActionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(CREATE_NEW_EQUIPMENT, createNewEquipmentSaga),
    takeEvery(EDIT_EQUIPMENT,       editEquipmentSaga),
    takeEvery(DELETE_EQUIPMENT,     deleteEquipmentSaga),
    
    takeEvery(CREATE_NEW_PRIVATE_EQUIPMENT, createNewPrivateEquipmentSaga),
    takeEvery(EDIT_PRIVATE_EQUIPMENT,       editPrivateEquipmentSaga),
    takeEvery(DELETE_PRIVATE_EQUIPMENT,     deletePrivateEquipmentSaga)
  ]);
}