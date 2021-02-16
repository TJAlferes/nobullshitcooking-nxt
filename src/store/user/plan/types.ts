export const actionTypes = {
  USER_CREATE_NEW_PLAN: 'USER_CREATE_NEW_PLAN',
  USER_EDIT_PLAN: 'USER_EDIT_PLAN',
  USER_DELETE_PLAN: 'USER_DELETE_PLAN'
} as const;

export interface IUserCreatePlan {
  type: typeof actionTypes.USER_CREATE_NEW_PLAN;
  planInfo: ICreatingPlanInfo;
}

export interface IUserEditPlan {
  type: typeof actionTypes.USER_EDIT_PLAN;
  planInfo: IEditingPlanInfo;
}

export interface IUserDeletePlan {
  type: typeof actionTypes.USER_DELETE_PLAN;
  id: number;
}

export interface ICreatingPlanInfo {
  name: string;
  data: string;
}

export interface IEditingPlanInfo extends ICreatingPlanInfo {
  id: number;
}