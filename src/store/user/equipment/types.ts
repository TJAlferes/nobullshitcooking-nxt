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
  USER_EDIT_PRIVATE_EQUIPMENT: 'USER_EDIT_PRIVATE_EQUIPMENT',
  USER_DELETE_PRIVATE_EQUIPMENT: 'USER_DELETE_PRIVATE_EQUIPMENT'
} as const;

export interface IUserCreateNewPrivateEquipment {
  type: typeof actionTypes.USER_CREATE_NEW_PRIVATE_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IUserEditPrivateEquipment {
  type: typeof actionTypes.USER_EDIT_PRIVATE_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IUserDeletePrivateEquipment {
  type: typeof actionTypes.USER_DELETE_PRIVATE_EQUIPMENT;
  id: number;
}