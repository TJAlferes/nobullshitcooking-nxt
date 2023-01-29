import { createNewEquipment, editEquipment, deleteEquipment } from '../../../../src/store/staff/equipment/actions';
import { actionTypes } from '../../../../src/store/staff/equipment/types';

const { CREATE_NEW_EQUIPMENT, EDIT_EQUIPMENT, DELETE_EQUIPMENT } = actionTypes;

const creatingInfo = {
  equipmentTypeId: 3,
  name: "Metal Spatula",
  description: "It works.",
  image: "nobsc-metal-spatula",
  fullImage: null,
  tinyImage: null
};
const editInfo = {
  id: 1,
  prevImage: "nobsc-metal-spatula",
  ...creatingInfo
};

describe('createNewEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewEquipment(creatingInfo).type).toEqual(CREATE_NEW_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(createNewEquipment(creatingInfo).equipmentInfo).toEqual(creatingInfo);
  });
});

describe('editEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(editEquipment(editInfo).type).toEqual(EDIT_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(editEquipment(editInfo).equipmentInfo).toEqual(editInfo);
  });
});

describe('deleteEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(deleteEquipment(7).type).toEqual(DELETE_EQUIPMENT);
  });

  it('returns the correct equipmentId', () => {
    expect(deleteEquipment(7).id).toEqual(7);
  });
});