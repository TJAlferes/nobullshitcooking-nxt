export const actionTypes = {
  STAFF_CREATE_NEW_EQUIPMENT: 'STAFF_CREATE_NEW_EQUIPMENT',
  STAFF_EDIT_EQUIPMENT: 'STAFF_EDIT_EQUIPMENT',
  STAFF_DELETE_EQUIPMENT: 'STAFF_DELETE_EQUIPMENT'
} as const;

export interface IStaffCreateNewEquipment {
  type: typeof actionTypes.STAFF_CREATE_NEW_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IStaffEditEquipment {
  type: typeof actionTypes.STAFF_EDIT_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IStaffDeleteEquipment {
  type: typeof actionTypes.STAFF_DELETE_EQUIPMENT;
  id: number;
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