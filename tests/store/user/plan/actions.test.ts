import {
  userCreateNewPlan,
  userEditPlan,
  userDeletePlan
} from '../../../../src/store/user/plan/actions';
import { actionTypes } from '../../../../src/store/user/plan/types';

const { USER_CREATE_NEW_PLAN, USER_EDIT_PLAN, USER_DELETE_PLAN } = actionTypes;

const creatingPlanInfo = {name: "Plan B", data: ""};
const editingPlanInfo = {id: 2, name: "Plan B", data: ""};

describe('userCreateNewPlan action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewPlan(creatingPlanInfo).type)
      .toEqual(USER_CREATE_NEW_PLAN);
  });

  it('returns the correct planInfo', () => {
    expect(userCreateNewPlan(creatingPlanInfo).planInfo)
      .toEqual(creatingPlanInfo);
  });
});

describe('userEditPlan action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditPlan(editingPlanInfo).type).toEqual(USER_EDIT_PLAN);
  });

  it('returns the correct planInfo', () => {
    expect(userEditPlan(editingPlanInfo).planInfo).toEqual(editingPlanInfo);
  });
});

describe('userDeletePlan action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeletePlan(7).type).toEqual(USER_DELETE_PLAN);
  });

  it('returns the correct id', () => {
    expect(userDeletePlan(7).id).toEqual(7);
  });
});