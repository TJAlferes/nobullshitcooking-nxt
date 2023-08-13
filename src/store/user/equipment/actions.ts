import { actionTypes, EquipmentInfo, EquipmentUpdateInfo } from './types';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export const createEquipment = (equipmentInfo: EquipmentInfo) =>       ({type: CREATE_EQUIPMENT, equipmentInfo});
export const updateEquipment = (equipmentInfo: EquipmentUpdateInfo) => ({type: UPDATE_EQUIPMENT, equipmentInfo});
export const deleteEquipment = (equipment_id: string) =>               ({type: DELETE_EQUIPMENT, equipment_id});
