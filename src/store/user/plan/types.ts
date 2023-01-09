export const actionTypes = {
  CREATE_NEW_PLAN: 'CREATE_NEW_PLAN',
  EDIT_PLAN:       'EDIT_PLAN',
  DELETE_PLAN:     'DELETE_PLAN'
} as const;

export interface ICreatePlan {
  type:     typeof actionTypes.CREATE_NEW_PLAN;
  planInfo: ICreatingPlanInfo;
}

export interface IEditPlan {
  type:     typeof actionTypes.EDIT_PLAN;
  planInfo: IEditingPlanInfo;
}

export interface IDeletePlan {
  type: typeof actionTypes.DELETE_PLAN;
  id:   number;
}

export interface ICreatingPlanInfo {
  name: string;
  data: string;
}

export interface IEditingPlanInfo extends ICreatingPlanInfo {
  id: number;
}