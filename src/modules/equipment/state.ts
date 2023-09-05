import type { Ownership }                              from "../shared/types";
import type { EquipmentUpload, EquipmentUpdateUpload } from "./form";

export const createEquipment = (ownership: Ownership, equipment_upload: EquipmentUpload) =>
  ({type: CREATE_EQUIPMENT, ownership, equipment_upload});

export const updateEquipment = (ownership: Ownership, equipment_update_upload: EquipmentUpdateUpload) =>
  ({type: UPDATE_EQUIPMENT, ownership, equipment_update_upload});

export const deleteEquipment = (ownership: Ownership, equipment_id: string) =>
  ({type: DELETE_EQUIPMENT, ownership, equipment_id});

export const actionTypes = {
  CREATE_EQUIPMENT: 'CREATE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'DELETE_EQUIPMENT'
} as const;

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export type CreateEquipment = {
  type:             typeof actionTypes.CREATE_EQUIPMENT;
  ownership:        Ownership;
  equipment_upload: EquipmentUpload;
};

export type UpdateEquipment = {
  type:                    typeof actionTypes.UPDATE_EQUIPMENT;
  ownership:               Ownership;
  equipment_update_upload: EquipmentUpdateUpload;
};

export type DeleteEquipment = {
  type:         typeof actionTypes.DELETE_EQUIPMENT;
  ownership:    Ownership;
  equipment_id: string;
};
