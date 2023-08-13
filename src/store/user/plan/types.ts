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
  plan_id:   string;
};

// TO DO: move shared types to one location

export type PlanInfo = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PlanUpdateInfo = PlanInfo & {
  plan_id: string;
};
