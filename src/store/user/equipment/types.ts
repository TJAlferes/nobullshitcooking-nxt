export const actionTypes = {
  CREATE_EQUIPMENT: 'CREATE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'DELETE_EQUIPMENT'
} as const;

export type CreateEquipment = {
  type:          typeof actionTypes.CREATE_EQUIPMENT;
  equipmentInfo: EquipmentInfo;
};

export type UpdateEquipment = {
  type:          typeof actionTypes.UPDATE_EQUIPMENT;
  equipmentInfo: EquipmentUpdateInfo;
};

export type DeleteEquipment = {
  type: typeof actionTypes.DELETE_EQUIPMENT;
  id:   number;
};

export type EquipmentInfo = {
  equipmentTypeId: number;
  name:            string;
  description:     string;
  image:           string | ArrayBuffer | null;
  fullImage:       File | null;
  tinyImage:       File | null;
};

export type EquipmentUpdateInfo = EquipmentInfo & {
  id:        number;
  prevImage: string;
};
