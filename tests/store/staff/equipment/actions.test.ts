import {
  staffCreateNewEquipment,
  staffEditEquipment,
  staffDeleteEquipment
} from '../../../../src/store/staff/equipment/actions';
import { actionTypes } from '../../../../src/store/staff/equipment/types';

const {
  STAFF_CREATE_NEW_EQUIPMENT,
  STAFF_EDIT_EQUIPMENT,
  STAFF_DELETE_EQUIPMENT
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

describe('staffCreateNewEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(staffCreateNewEquipment(creatingEquipmentInfo).type)
      .toEqual(STAFF_CREATE_NEW_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(staffCreateNewEquipment(creatingEquipmentInfo).equipmentInfo)
      .toEqual(creatingEquipmentInfo);
  });
});

describe('staffEditEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(staffEditEquipment(editingEquipmentInfo).type)
      .toEqual(STAFF_EDIT_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(staffEditEquipment(editingEquipmentInfo).equipmentInfo)
      .toEqual(editingEquipmentInfo);
  });
});

describe('staffDeleteEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(staffDeleteEquipment(7).type).toEqual(STAFF_DELETE_EQUIPMENT);
  });

  it('returns the correct equipmentId', () => {
    expect(staffDeleteEquipment(7).id).toEqual(7);
  });
});