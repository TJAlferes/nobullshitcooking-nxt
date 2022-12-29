import { all, takeEvery } from 'redux-saga/effects';

import { staffCreateNewEquipmentSaga, staffEditEquipmentSaga, staffDeleteEquipmentSaga } from '../staff/equipment/sagas';
import { actionTypes as staffEquipmentActionTypes } from '../staff/equipment/types';
import { userCreateNewPrivateEquipmentSaga, userEditPrivateEquipmentSaga, userDeletePrivateEquipmentSaga } from '../user/equipment/sagas';
import { actionTypes as userEquipmentActionTypes } from '../user/equipment/types';

const { STAFF_CREATE_NEW_EQUIPMENT, STAFF_EDIT_EQUIPMENT, STAFF_DELETE_EQUIPMENT } =                      staffEquipmentActionTypes;
const { USER_CREATE_NEW_PRIVATE_EQUIPMENT, USER_EDIT_PRIVATE_EQUIPMENT, USER_DELETE_PRIVATE_EQUIPMENT } = userEquipmentActionTypes;

export function* watchEquipment() {
  yield all([
    takeEvery(STAFF_CREATE_NEW_EQUIPMENT,        staffCreateNewEquipmentSaga),
    takeEvery(STAFF_EDIT_EQUIPMENT,              staffEditEquipmentSaga),
    takeEvery(STAFF_DELETE_EQUIPMENT,            staffDeleteEquipmentSaga),
    takeEvery(USER_CREATE_NEW_PRIVATE_EQUIPMENT, userCreateNewPrivateEquipmentSaga),
    takeEvery(USER_EDIT_PRIVATE_EQUIPMENT,       userEditPrivateEquipmentSaga),
    takeEvery(USER_DELETE_PRIVATE_EQUIPMENT,     userDeletePrivateEquipmentSaga)
  ]);
}