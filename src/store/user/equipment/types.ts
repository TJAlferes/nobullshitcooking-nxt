export const actionTypes = {
  CREATE_EQUIPMENT: 'CREATE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'DELETE_EQUIPMENT'
} as const;

export interface ICreateEquipment {
  type:          typeof actionTypes.CREATE_EQUIPMENT;
  equipmentInfo: IEquipmentInfo;
}

export interface IUpdateEquipment {
  type:          typeof actionTypes.UPDATE_EQUIPMENT;
  equipmentInfo: IEquipmentUpdateInfo;
}

export interface IDeleteEquipment {
  type: typeof actionTypes.DELETE_EQUIPMENT;
  id:   number;
}

export interface IEquipmentInfo {
  equipmentTypeId: number;
  name:            string;
  description:     string;
  image:           string | ArrayBuffer | null;
  fullImage:       File | null;
  tinyImage:       File | null;
}

export interface IEquipmentUpdateInfo extends IEquipmentInfo {
  id:        number;
  prevImage: string;
}
