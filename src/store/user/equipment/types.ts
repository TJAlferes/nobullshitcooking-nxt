import { ICreatingEquipmentInfo, IEditingEquipmentInfo } from '../../staff/equipment/types';

export type { ICreatingEquipmentInfo, IEditingEquipmentInfo } from '../../staff/equipment/types';

export const actionTypes = {
  CREATE_NEW_PRIVATE_EQUIPMENT: 'CREATE_NEW_PRIVATE_EQUIPMENT',
  EDIT_PRIVATE_EQUIPMENT:       'EDIT_PRIVATE_EQUIPMENT',
  DELETE_PRIVATE_EQUIPMENT:     'DELETE_PRIVATE_EQUIPMENT'
} as const;

export interface ICreateNewPrivateEquipment {
  type:          typeof actionTypes.CREATE_NEW_PRIVATE_EQUIPMENT;
  equipmentInfo: ICreatingEquipmentInfo;
}

export interface IEditPrivateEquipment {
  type:          typeof actionTypes.EDIT_PRIVATE_EQUIPMENT;
  equipmentInfo: IEditingEquipmentInfo;
}

export interface IDeletePrivateEquipment {
  type: typeof actionTypes.DELETE_PRIVATE_EQUIPMENT;
  id:   number;
}