import {
  actionTypes,
  ICreatingEquipmentInfo,
  IEditingEquipmentInfo
} from './types';

const {
  STAFF_CREATE_NEW_EQUIPMENT,
  STAFF_EDIT_EQUIPMENT,
  STAFF_DELETE_EQUIPMENT
} = actionTypes;

export const staffCreateNewEquipment = (
  equipmentInfo: ICreatingEquipmentInfo
) => ({
  type: STAFF_CREATE_NEW_EQUIPMENT,
  equipmentInfo
});

export const staffEditEquipment = (equipmentInfo: IEditingEquipmentInfo) => ({
  type: STAFF_EDIT_EQUIPMENT,
  equipmentInfo
});

export const staffDeleteEquipment = (id: number) => ({
  type: STAFF_DELETE_EQUIPMENT,
  id
});