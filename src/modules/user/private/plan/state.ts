// TO DO: split into private and public

export const createPlan = (planInfo: PlanInfo) => ({type: CREATE_PLAN, planInfo});

export const updatePlan = (planInfo: PlanUpdateInfo) => ({type: UPDATE_PLAN, planInfo});

export const deletePlan = (plan_id: string) => ({type: DELETE_PLAN, plan_id});



export const actionTypes = {
  CREATE_PLAN: 'CREATE_PLAN',
  UPDATE_PLAN: 'UPDATE_PLAN',
  DELETE_PLAN: 'DELETE_PLAN'
} as const;

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export type CreatePlan = {
  type:     typeof actionTypes.CREATE_PLAN;
  planInfo: PlanInfo;
};

export type UpdatePlan = {
  type:     typeof actionTypes.UPDATE_PLAN;
  planInfo: PlanUpdateInfo;
};

export type DeletePlan = {
  type:    typeof actionTypes.DELETE_PLAN;
  plan_id: string;
};

// TO DO: move shared types to one location

export type PlanInfo = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PlanUpdateInfo = PlanInfo & {
  plan_id: string;
};
