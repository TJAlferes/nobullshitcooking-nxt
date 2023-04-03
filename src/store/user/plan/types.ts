export const actionTypes = {
  CREATE_PLAN: 'CREATE_PLAN',
  UPDATE_PLAN: 'UPDATE_PLAN',
  DELETE_PLAN: 'DELETE_PLAN'
} as const;

export type CreatePlan = {
  type:     typeof actionTypes.CREATE_PLAN;
  planInfo: PlanInfo;
};

export type UpdatePlan = {
  type:     typeof actionTypes.UPDATE_PLAN;
  planInfo: PlanUpdateInfo;
};

export type DeletePlan = {
  type: typeof actionTypes.DELETE_PLAN;
  id:   number;
};

export type PlanInfo = {
  name: string;
  data: string;
};

export type PlanUpdateInfo = PlanInfo & {
  id: number;
};
