export const actionTypes = {
  CREATE_PLAN: 'CREATE_PLAN',
  UPDATE_PLAN: 'UPDATE_PLAN',
  DELETE_PLAN: 'DELETE_PLAN'
} as const;

export interface ICreatePlan {
  type:     typeof actionTypes.CREATE_PLAN;
  planInfo: IPlanInfo;
}

export interface IUpdatePlan {
  type:     typeof actionTypes.UPDATE_PLAN;
  planInfo: IPlanUpdateInfo;
}

export interface IDeletePlan {
  type: typeof actionTypes.DELETE_PLAN;
  id:   number;
}

export interface IPlanInfo {
  name: string;
  data: string;
}

export interface IPlanUpdateInfo extends IPlanInfo {
  id: number;
}