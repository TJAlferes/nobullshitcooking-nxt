import { createNewPlan, editPlan, deletePlan } from '../../../../src/store/user/plan/actions';
import { actionTypes } from '../../../../src/store/user/plan/types';

const { CREATE_NEW_PLAN, EDIT_PLAN, DELETE_PLAN } = actionTypes;

const creatingInfo = {name: "Plan B", data: ""};
const editInfo =     {id: 2, ...creatingInfo};

describe('createNewPlan action creator', () => {
  it('returns the correct action type', () => {
    expect(createNewPlan(creatingInfo).type).toEqual(CREATE_NEW_PLAN);
  });

  it('returns the correct planInfo', () => {
    expect(createNewPlan(creatingInfo).planInfo).toEqual(creatingInfo);
  });
});

describe('editPlan action creator', () => {
  it('returns the correct action type', () => {
    expect(editPlan(editInfo).type).toEqual(EDIT_PLAN);
  });

  it('returns the correct planInfo', () => {
    expect(editPlan(editInfo).planInfo).toEqual(editInfo);
  });
});

describe('deletePlan action creator', () => {
  it('returns the correct action type', () => {
    expect(deletePlan(7).type).toEqual(DELETE_PLAN);
  });

  it('returns the correct id', () => {
    expect(deletePlan(7).id).toEqual(7);
  });
});