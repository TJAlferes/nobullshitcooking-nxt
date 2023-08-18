

export const createEquipment = (equipmentInfo: EquipmentInfo) =>
  ({type: CREATE_EQUIPMENT, equipmentInfo});

export const updateEquipment = (equipmentInfo: EquipmentUpdateInfo) =>
  ({type: UPDATE_EQUIPMENT, equipmentInfo});

export const deleteEquipment = (equipment_id: string) =>
  ({type: DELETE_EQUIPMENT, equipment_id});



export const actionTypes = {
  CREATE_EQUIPMENT: 'CREATE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'DELETE_EQUIPMENT'
} as const;

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export type CreateEquipment = {
  type:           typeof actionTypes.CREATE_EQUIPMENT;
  equipment_info: EquipmentInfo;
};

export type UpdateEquipment = {
  type:           typeof actionTypes.UPDATE_EQUIPMENT;
  equipment_info: EquipmentUpdateInfo;
};

export type DeleteEquipment = {
  type:         typeof actionTypes.DELETE_EQUIPMENT;
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
