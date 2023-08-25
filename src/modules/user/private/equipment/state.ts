

export const createPrivateEquipment = (equipmentInfo: EquipmentInfo) =>
  ({type: CREATE_PRIVATE_EQUIPMENT, equipmentInfo});

export const updatePrivateEquipment = (equipmentInfo: EquipmentUpdateInfo) =>
  ({type: UPDATE_PRIVATE_EQUIPMENT, equipmentInfo});

export const deletePrivateEquipment = (equipment_id: string) =>
  ({type: DELETE_PRIVATE_EQUIPMENT, equipment_id});



export const actionTypes = {
  CREATE_PRIVATE_EQUIPMENT: 'CREATE_PRIVATE_EQUIPMENT',
  UPDATE_PRIVATE_EQUIPMENT: 'UPDATE_PRIVATE_EQUIPMENT',
  DELETE_PRIVATE_EQUIPMENT: 'DELETE_PRIVATE_EQUIPMENT'
} as const;

const { CREATE_PRIVATE_EQUIPMENT, UPDATE_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = actionTypes;

export type CreatePrivateEquipment = {
  type:           typeof actionTypes.CREATE_PRIVATE_EQUIPMENT;
  equipment_info: EquipmentInfo;
};

export type UpdatePrivateEquipment = {
  type:           typeof actionTypes.UPDATE_PRIVATE_EQUIPMENT;
  equipment_info: EquipmentUpdateInfo;
};

export type DeletePrivateEquipment = {
  type:         typeof actionTypes.DELETE_PRIVATE_EQUIPMENT;
  equipment_id: string;
};

// TO DO: move shared types to one location

export type EquipmentInfo = {
  equipment_type_id: number;
  equipment_name:    string;
  notes:             string;
  //image:             string | ArrayBuffer | null;
  //fullImage:         File | null;
  //tinyImage:         File | null;
};

export type EquipmentUpdateInfo = EquipmentInfo & {
  equipment_id: string;
  //prevImage:    string;
};
