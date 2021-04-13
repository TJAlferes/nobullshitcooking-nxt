import {
  userCreateNewPrivateEquipment,
  userEditPrivateEquipment,
  userDeletePrivateEquipment
} from '../../../../src/store/user/equipment/actions';
import { actionTypes } from '../../../../src/store/user/equipment/types';

const {
  USER_CREATE_NEW_PRIVATE_EQUIPMENT,
  USER_EDIT_PRIVATE_EQUIPMENT,
  USER_DELETE_PRIVATE_EQUIPMENT
} = actionTypes;

const creatingEquipmentInfo = {
  equipmentTypeId: 3,
  name: "Metal Spatula",
  description: "It works.",
  image: "nobsc-metal-spatula",
  fullImage: null,
  tinyImage: null
};
const editingEquipmentInfo = {
  id: 1,
  equipmentTypeId: 3,
  name: "Metal Spatula",
  description: "It works.",
  prevImage: "nobsc-metal-spatula",
  image: "nobsc-metal-spatula",
  fullImage: null,
  tinyImage: null
};

describe('userCreateNewPrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewPrivateEquipment(creatingEquipmentInfo).type)
      .toEqual(USER_CREATE_NEW_PRIVATE_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(userCreateNewPrivateEquipment(creatingEquipmentInfo).equipmentInfo)
      .toEqual(creatingEquipmentInfo);
  });
});

describe('userEditPrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditPrivateEquipment(editingEquipmentInfo).type)
      .toEqual(USER_EDIT_PRIVATE_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(userEditPrivateEquipment(editingEquipmentInfo).equipmentInfo)
      .toEqual(editingEquipmentInfo);
  });
});

describe('userDeletePrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeletePrivateEquipment(7).type)
      .toEqual(USER_DELETE_PRIVATE_EQUIPMENT);
  });

  it('returns the correct id', () => {
    expect(userDeletePrivateEquipment(7).id).toEqual(7);
  });
});