export const actionTypes = {
  STAFF_CREATE_NEW_EQUIPMENT: 'STAFF_CREATE_NEW_EQUIPMENT',
  STAFF_CREATE_NEW_EQUIPMENT_SUCCEEDED: 'STAFF_CREATE_NEW_EQUIPMENT_SUCCEEDED',
  STAFF_CREATE_NEW_EQUIPMENT_FAILED: 'STAFF_CREATE_NEW_EQUIPMENT_FAILED',
  STAFF_EDIT_EQUIPMENT: 'STAFF_EDIT_EQUIPMENT',
  STAFF_EDIT_EQUIPMENT_SUCCEEDED: 'STAFF_EDIT_EQUIPMENT_SUCCEEDED',
  STAFF_EDIT_EQUIPMENT_FAILED: 'STAFF_EDIT_EQUIPMENT_FAILED',
  STAFF_DELETE_EQUIPMENT: 'STAFF_DELETE_EQUIPMENT',
  STAFF_DELETE_EQUIPMENT_SUCCEEDED: 'STAFF_DELETE_EQUIPMENT_SUCCEEDED',
  STAFF_DELETE_EQUIPMENT_FAILED: 'STAFF_DELETE_EQUIPMENT_FAILED'
};

export interface IStaffCreateNewEquipment {
  type: typeof actionTypes.STAFF_CREATE_NEW_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IStaffCreateNewEquipmentSucceeded {
  type: typeof actionTypes.STAFF_CREATE_NEW_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IStaffCreateNewEquipmentFailed {
  type: typeof actionTypes.STAFF_CREATE_NEW_EQUIPMENT_FAILED;
  message: string;
}

export interface IStaffEditEquipment {
  type: typeof actionTypes.STAFF_EDIT_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IStaffEditEquipmentSucceeded {
  type: typeof actionTypes.STAFF_EDIT_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IStaffEditEquipmentFailed {
  type: typeof actionTypes.STAFF_EDIT_EQUIPMENT_FAILED;
  message: string;
}

export interface IStaffDeleteEquipment {
  type: typeof actionTypes.STAFF_DELETE_EQUIPMENT;
  id: number;
}

export interface IStaffDeleteEquipmentSucceeded {
  type: typeof actionTypes.STAFF_DELETE_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IStaffDeleteEquipmentFailed {
  type: typeof actionTypes.STAFF_DELETE_EQUIPMENT_FAILED;
  message: string;
}

export interface ICreatingEquipmentInfo {
  equipmentTypeId: number;
  name: string;
  description: string;
  image: string | ArrayBuffer | null;
  fullImage: File | null;
  tinyImage: File | null;
}

export interface IEditingEquipmentInfo extends ICreatingEquipmentInfo {
  id: number;
  prevImage: string;
}