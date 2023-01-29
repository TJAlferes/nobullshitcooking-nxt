import { createNewPrivateEquipment, editPrivateEquipment, deletePrivateEquipment } from '../../../../src/store/user/equipment/actions';
import { actionTypes } from '../../../../src/store/user/equipment/types';

const { CREATE_NEW_PRIVATE_EQUIPMENT, EDIT_PRIVATE_EQUIPMENT, DELETE_PRIVATE_EQUIPMENT } = actionTypes;

const creatingInfo = {
  equipmentTypeId: 3,
  name:            "Metal Spatula",
  description:     "It works.",
  image:           "nobsc-metal-spatula",
  fullImage:       null,
  tinyImage:       null
};
const editInfo = {
  id:        1,
  prevImage: "nobsc-metal-spatula",
  ...creatingInfo
};

describe('createNewPrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewPrivateEquipment(creatingInfo).type).toEqual(CREATE_NEW_PRIVATE_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(createNewPrivateEquipment(creatingInfo).equipmentInfo).toEqual(creatingInfo);
  });
});

describe('editPrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(editPrivateEquipment(editInfo).type).toEqual(EDIT_PRIVATE_EQUIPMENT);
  });

  it('returns the correct equipmentInfo', () => {
    expect(editPrivateEquipment(editInfo).equipmentInfo).toEqual(editInfo);
  });
});

describe('deletePrivateEquipment action creator', () => {
  it('returns the correct action type', () => {
    expect(deletePrivateEquipment(7).type).toEqual(DELETE_PRIVATE_EQUIPMENT);
  });

  it('returns the correct id', () => {
    expect(deletePrivateEquipment(7).id).toEqual(7);
  });
});