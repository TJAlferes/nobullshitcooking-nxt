import { actionTypes, ICreatingEquipmentInfo, IEditingEquipmentInfo } from './types';

const { CREATE_NEW_EQUIPMENT, EDIT_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

export const createNewEquipment = (equipmentInfo: ICreatingEquipmentInfo) => ({type: CREATE_NEW_EQUIPMENT, equipmentInfo});
export const editEquipment =      (equipmentInfo: IEditingEquipmentInfo) =>  ({type: EDIT_EQUIPMENT, equipmentInfo});
export const deleteEquipment =    (id: number) =>                            ({type: DELETE_EQUIPMENT, id});