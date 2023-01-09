import { actionTypes, ICreatingEquipmentInfo, IEditingEquipmentInfo } from './types';

const { CREATE_NEW_PRIVATE_EQUIPMENT, EDIT_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = actionTypes;

export const createNewPrivateEquipment = (equipmentInfo: ICreatingEquipmentInfo) => ({type: CREATE_NEW_PRIVATE_EQUIPMENT, equipmentInfo});
export const editPrivateEquipment =      (equipmentInfo: IEditingEquipmentInfo) =>  ({type: EDIT_PRIVATE_EQUIPMENT, equipmentInfo});
export const deletePrivateEquipment =    (id: number) =>                            ({type: DELETE_PRIVATE_EQUIPMENT, id});