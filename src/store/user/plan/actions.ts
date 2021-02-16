import { actionTypes, ICreatingPlanInfo, IEditingPlanInfo } from './types';

const {
  USER_CREATE_NEW_PLAN,
  USER_EDIT_PLAN,
  USER_DELETE_PLAN
} = actionTypes;

export const userCreateNewPlan = (planInfo: ICreatingPlanInfo) => ({
  type: USER_CREATE_NEW_PLAN,
  planInfo
});

export const userEditPlan = (planInfo: IEditingPlanInfo) => ({
  type: USER_EDIT_PLAN,
  planInfo
});

export const userDeletePlan = (id: number) => ({
  type: USER_DELETE_PLAN,
  id
});