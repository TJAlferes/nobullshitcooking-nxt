import { actionTypes, IEquipmentInfo, IEquipmentUpdateInfo } from './types';

const { CREATE_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export const createEquipment = (equipmentInfo: IEquipmentInfo) =>       ({type: CREATE_EQUIPMENT, equipmentInfo});
export const updateEquipment = (equipmentInfo: IEquipmentUpdateInfo) => ({type: UPDATE_EQUIPMENT, equipmentInfo});
export const deleteEquipment = (id: number) =>                          ({type: DELETE_EQUIPMENT, id});
