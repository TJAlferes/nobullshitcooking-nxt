export const actionTypes = {
  USER_CREATE_NEW_PLAN: 'USER_CREATE_NEW_PLAN',
  USER_CREATE_NEW_PLAN_SUCCEEDED: 'USER_CREATE_NEW_PLAN_SUCCEEDED',
  USER_CREATE_NEW_PLAN_FAILED: 'USER_CREATE_NEW_PLAN_FAILED',
  USER_EDIT_PLAN: 'USER_EDIT_PLAN',
  USER_EDIT_PLAN_SUCCEEDED: 'USER_EDIT_PLAN_SUCCEEDED',
  USER_EDIT_PLAN_FAILED: 'USER_EDIT_PLAN_FAILED',
  USER_DELETE_PLAN: 'USER_DELETE_PLAN',
  USER_DELETE_PLAN_SUCCEEDED: 'USER_DELETE_PLAN_SUCCEEDED',
  USER_DELETE_PLAN_FAILED: 'USER_DELETE_PLAN_FAILED'
} as const;

export interface IUserCreatePlan {
  type: typeof actionTypes.USER_CREATE_NEW_PLAN;
  planInfo: ICreatingPlanInfo;
}

export interface IUserCreatePlanSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_PLAN_SUCCEEDED;
  message: string;
}

export interface IUserCreatePlanFailed {
  type: typeof actionTypes.USER_CREATE_NEW_PLAN_FAILED;
  message: string;
}

export interface IUserEditPlan {
  type: typeof actionTypes.USER_EDIT_PLAN;
  planInfo: IEditingPlanInfo;
}

export interface IUserEditPlanSucceeded {
  type: typeof actionTypes.USER_EDIT_PLAN_SUCCEEDED;
  message: string;
}

export interface IUserEditPlanFailed {
  type: typeof actionTypes.USER_EDIT_PLAN_FAILED;
  message: string;
}

export interface IUserDeletePlan {
  type: typeof actionTypes.USER_DELETE_PLAN;
  id: number;
}

export interface IUserDeletePlanSucceeded {
  type: typeof actionTypes.USER_DELETE_PLAN_SUCCEEDED;
  message: string;
}

export interface IUserDeletePlanFailed {
  type: typeof actionTypes.USER_DELETE_PLAN_FAILED;
  message: string;
}

export interface ICreatingPlanInfo {
  name: string;
  data: string;
}

export interface IEditingPlanInfo extends ICreatingPlanInfo {
  id: number;
}