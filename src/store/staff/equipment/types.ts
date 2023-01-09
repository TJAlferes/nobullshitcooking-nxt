export const actionTypes = {
  CREATE_NEW_EQUIPMENT: 'CREATE_NEW_EQUIPMENT',
  EDIT_EQUIPMENT:       'EDIT_EQUIPMENT',
  DELETE_EQUIPMENT:     'DELETE_EQUIPMENT'
} as const;

export interface ICreateNewEquipment {
  type:          typeof actionTypes.CREATE_NEW_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IEditEquipment {
  type:          typeof actionTypes.EDIT_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IDeleteEquipment {
  type: typeof actionTypes.DELETE_EQUIPMENT;
  id:   number;
}

export interface ICreatingEquipmentInfo {
  equipmentTypeId: number;
  name:            string;
  description:     string;
  image:           string | ArrayBuffer | null;
  fullImage:       File | null;
  tinyImage:       File | null;
}

export interface IEditingEquipmentInfo extends ICreatingEquipmentInfo {
  id:        number;
  prevImage: string;
}