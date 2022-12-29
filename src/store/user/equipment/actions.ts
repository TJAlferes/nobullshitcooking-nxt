import { actionTypes, ICreatingEquipmentInfo, IEditingEquipmentInfo } from './types';

const { USER_CREATE_NEW_PRIVATE_EQUIPMENT, USER_EDIT_PRIVATE_EQUIPMENT, USER_DELETE_PRIVATE_EQUIPMENT } = actionTypes;

export const userCreateNewPrivateEquipment = (equipmentInfo: ICreatingEquipmentInfo) => ({type: USER_CREATE_NEW_PRIVATE_EQUIPMENT, equipmentInfo});

export const userEditPrivateEquipment = (equipmentInfo: IEditingEquipmentInfo) => ({type: USER_EDIT_PRIVATE_EQUIPMENT, equipmentInfo});

export const userDeletePrivateEquipment = (id: number) => ({type: USER_DELETE_PRIVATE_EQUIPMENT, id});