import {
  ICreatingEquipmentInfo,
  IEditingEquipmentInfo
} from '../../staff/equipment/types';

export type {
  ICreatingEquipmentInfo,
  IEditingEquipmentInfo
} from '../../staff/equipment/types';

export const actionTypes = {
  USER_CREATE_NEW_PRIVATE_EQUIPMENT: 'USER_CREATE_NEW_PRIVATE_EQUIPMENT',
  USER_CREATE_NEW_PRIVATE_EQUIPMENT_SUCCEEDED: 'USER_CREATE_NEW_PRIVATE_EQUIPMENT_SUCCEEDED',
  USER_CREATE_NEW_PRIVATE_EQUIPMENT_FAILED: 'USER_CREATE_NEW_PRIVATE_EQUIPMENT_FAILED',
  USER_EDIT_PRIVATE_EQUIPMENT: 'USER_EDIT_PRIVATE_EQUIPMENT',
  USER_EDIT_PRIVATE_EQUIPMENT_SUCCEEDED: 'USER_EDIT_PRIVATE_EQUIPMENT_SUCCEEDED',
  USER_EDIT_PRIVATE_EQUIPMENT_FAILED: 'USER_EDIT_PRIVATE_EQUIPMENT_FAILED',
  USER_DELETE_PRIVATE_EQUIPMENT: 'USER_DELETE_PRIVATE_EQUIPMENT',
  USER_DELETE_PRIVATE_EQUIPMENT_SUCCEEDED: 'USER_DELETE_PRIVATE_EQUIPMENT_SUCCEEDED',
  USER_DELETE_PRIVATE_EQUIPMENT_FAILED: 'USER_DELETE_PRIVATE_EQUIPMENT_FAILED'
} as const;

export interface IUserCreateNewPrivateEquipment {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IUserCreateNewPrivateEquipmentSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IUserCreateNewPrivateEquipmentFailed {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_EQUIPMENT_FAILED;
  message: string;
}

export interface IUserEditPrivateEquipment {
  type: typeof actionTypes.USER_EDIT_PRIVATE_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IUserEditPrivateEquipmentSucceeded {
  type: typeof actionTypes.USER_EDIT_PRIVATE_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IUserEditPrivateEquipmentFailed {
  type: typeof actionTypes.USER_EDIT_PRIVATE_EQUIPMENT_FAILED;
  message: string;
}

export interface IUserDeletePrivateEquipment {
  type: typeof actionTypes.USER_DELETE_PRIVATE_EQUIPMENT;
  id: number;
}

export interface IUserDeletePrivateEquipmentSucceeded {
  type: typeof actionTypes.USER_DELETE_PRIVATE_EQUIPMENT_SUCCEEDED;
  message: string;
}

export interface IUserDeletePrivateEquipmentFailed {
  type: typeof actionTypes.USER_DELETE_PRIVATE_EQUIPMENT_FAILED;
  message: string;
}